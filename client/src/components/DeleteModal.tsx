/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Group, Modal } from "@mantine/core";

interface DeleteProps {
  opened: boolean;
  close: () => void;
  deletingItem: {
    type: string,
    item: any, 
  };
  deleteFunc: () => void;
}

const Delete: React.FC<DeleteProps> = ({ opened, close, deletingItem, deleteFunc }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
          title={`Delete this ${deletingItem.type}?`}
          
    >
      Are you sure you want to delete this {deletingItem.type}? This action cannot be
      undone.
      <Group mt="lg" justify="flex-end">
        <Button onClick={close} variant="default">
          Cancel
        </Button>
        <Button onClick={deleteFunc} color="red">
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default Delete;
