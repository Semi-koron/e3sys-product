"use client";
import axios from "axios";
import Modal from "react-modal";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";

interface TechModalProps {
  modalTechId: number;
  techName: string;
  uuid: string;
  isModalOpen: boolean;
  masteredTech: number[];
  masteringTech: number[];
  setIsModalOpen: (bool: boolean) => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    maxWidth: "720px",
    height: "70%",
    backgroundColor: "white",
    boxShadow: "0 0 48px rgba(21, 21, 21, 0.05)",
    padding: "48px 44px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    transition: "opacity 200ms ease-in-out",
  },
  overlay: {
    transition: "opacity 200ms ease-in-out",
  },
};

export const TechModal = ({
  modalTechId,
  techName,
  uuid,
  isModalOpen,
  masteredTech,
  masteringTech,
  setIsModalOpen,
}: TechModalProps) => {
  const router = useRouter();
  const techLearn = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/user-data/learn",
      {
        uuid: uuid,
        techId: modalTechId,
      }
    );
    if (response.status === 200) {
      alert("学習を開始しました");
      setIsModalOpen(false);
      router.refresh();
    }
  };

  const techMaster = async () => {
    const response = await axios.post(
      "http://localhost:8080/api/user-data/master",
      {
        uuid: uuid,
        techId: modalTechId,
      }
    );
    if (response.status === 200) {
      alert("マスターしました");
      setIsModalOpen(false);
      router.refresh();
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      style={customStyles}
      closeTimeoutMS={500}
      ariaHideApp={false}
    >
      <div className="flex flex-col justify-between h-full w-full">
        <h2 className="text-2xl mb-4 text-black text-center">{techName}</h2>
        <div className="flex justify-between w-full">
          {masteredTech.includes(modalTechId) ? (
            <Button>マスター済み</Button>
          ) : masteringTech.includes(modalTechId) ? (
            <Button onClick={techMaster}>学習終了</Button>
          ) : (
            <Button onClick={techLearn}>学習する</Button>
          )}
          <Button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            閉じる
          </Button>
        </div>
      </div>
    </Modal>
  );
};
