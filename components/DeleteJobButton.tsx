import { toast } from "@/hooks/use-toast";
import { deleteJobAction } from "@/utils/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";

const DeleteJobButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast({
          title: "Failed",
          description: "there was an error",
          variant: "destructive",
        });
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["chars"] });

      toast({
        title: "Success",
        description: "Job created",
      });
    },
  });

  return (
    <Button
      size="sm"
      disabled={isPending}
      onClick={() => {
        mutate(id);
      }}
    >
      {isPending ? "deleting..." : "delete"}
    </Button>
  );
};
export default DeleteJobButton;
