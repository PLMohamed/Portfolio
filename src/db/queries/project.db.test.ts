import { describeWithDatabase } from "@/test/describe-with-db";
import { eq, ilike, or } from "drizzle-orm";
import { beforeAll, expect, it } from "vitest";
import { PROJECT_SCHEMA } from "../schema";
import { createProject, getProjectById, getProjects } from "./project";

await describeWithDatabase("project queries (database)", () => {
  beforeAll(async () => {
    await Promise.all([
      createProject({
        title: "Alpha",
        description: "First project",
        sort_order: 2,
        stack: ["React"],
        is_visible: true,
      }),
      createProject({
        title: "Bravo",
        description: "Second project",
        sort_order: 1,
        stack: ["Next.js"],
        is_visible: true,
      }),
      createProject({
        title: "Charlie",
        description: "Third project",
        sort_order: 3,
        stack: ["Typescript"],
        is_visible: true,
      }),
      createProject({
        title: "Delta",
        description: "Hidden project",
        sort_order: 0,
        stack: ["Python"],
        is_visible: false,
      }),
    ]);
  });

  it("stores and returns sort_order and stack", async () => {
    const projects = await getProjects(undefined, [], {
      orderBy: { column: PROJECT_SCHEMA.sort_order, direction: "asc" },
    });
    expect(projects.data[0].title).toBe("Delta");
    expect(projects.data[0].sort_order).toBe(0);
    expect(projects.data[0].stack).toEqual(["Python"]);
  });

  it("orders public projects by sort_order ascending", async () => {
    const projects = await getProjects(
      undefined,
      eq(PROJECT_SCHEMA.is_visible, true),
      { orderBy: { column: PROJECT_SCHEMA.sort_order, direction: "asc" } },
    );
    expect(projects.data.map((project) => project.title)).toEqual([
      "Bravo",
      "Alpha",
      "Charlie",
    ]);
  });

  it("excludes hidden projects from the public list", async () => {
    const projects = await getProjects(undefined, [
      eq(PROJECT_SCHEMA.is_visible, true),
    ]);
    expect(projects.data.map((project) => project.title)).not.toContain(
      "Delta",
    );
  });

  it("searches by title and description", async () => {
    const projects = await getProjects(
      undefined,
      or(
        ilike(PROJECT_SCHEMA.title, "%Second%"),
        ilike(PROJECT_SCHEMA.description, "%Second%"),
      ),
    );
    expect(projects.data.map((project) => project.title)).toEqual(["Bravo"]);
  });

  it("defaults sort_order to 0 and stack to an empty array", async () => {
    const created = await createProject({
      title: "Epsilon",
      description: "New project",
    });
    const project = await getProjectById(created.insertedId);
    expect(project?.sort_order).toBe(0);
    expect(project?.stack).toEqual([]);
  });
});
