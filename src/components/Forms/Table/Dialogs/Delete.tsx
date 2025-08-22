"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormsDialog } from "@/contexts/FormsDialog";
import { useDeleteForm } from "@/hooks/api/useContact";
import { CircleAlertIcon, LoaderIcon } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

export default function DeleteDialog() {
  const { deleteFormId, setDeleteFormId } = useFormsDialog();

  const { mutate: deleteForm, isPending } = useDeleteForm();

  const handleClose = useCallback(
    (open: boolean) => {
      if (isPending || open) return;
      setDeleteFormId(null);
    },
    [isPending, setDeleteFormId],
  );

  return (
    <Dialog open={!!deleteFormId} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <CircleAlertIcon className="fill-destructive text-destructive-foreground mx-auto size-14" />
          <DialogTitle className="text-center">Delete Form</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this form? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-4">
          <DialogClose asChild>
            <Button type="reset" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="destructive"
            disabled={isPending || !deleteFormId}
            onClick={() => {
              deleteForm(deleteFormId!, {
                onSuccess: () => {
                  toast.success("Form deleted successfully");
                  handleClose(false);
                },
              });
            }}
          >
            <span>Delete</span>
            {isPending && <LoaderIcon className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
