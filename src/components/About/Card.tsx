import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TechAndTools } from "@/lib/techs/data";
import Image from "next/image";

export default function StackCard({ imageUrl, name }: TechAndTools) {
  return (
    <Tooltip>
      <Card className="bg-muted mx-2 box-border size-12 items-center justify-center p-1">
        <TooltipTrigger>
          <Image src={imageUrl} alt={name} width={44} height={44} />
        </TooltipTrigger>
      </Card>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  );
}
