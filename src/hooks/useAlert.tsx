import Swal, { SweetAlertIcon } from "sweetalert2";

type AlertOptionsProps = {
  title: string;
  text?: string;
  icon?: SweetAlertIcon;
};


export function useAlert() {
  async function showAlert({ title, text, icon = "info" }: AlertOptionsProps) {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: "#2cb178",
      background: "#f9fbfa",
      color: "#1f2523",
    });
  }

  async function showConfirm({ title, text, icon = "success" }: AlertOptionsProps) {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#2cb178",
      cancelButtonColor: "#EF4444",
      background: "#f9fbfa",
      color: "#1f2523",
    });
  }

  return { showAlert, showConfirm };
}
