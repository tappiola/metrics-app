import { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  id: string;
  onCancel: () => void;
  className?: string;
}
