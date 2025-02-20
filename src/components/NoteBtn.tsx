import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
interface NoteButtonProps {
  note?: string;
  approved?: string;
}
export default function NoteButton({ note, approved }: NoteButtonProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex justify-center w-full">
      <Icon icon="mdi:information-outline" className="text-blue-700 cursor-pointer" onClick={() => setOpenModal(!openModal)} width={24} height={24} />
      <AnimatePresence>
        {openModal && (
          <motion.div onClick={() => setOpenModal(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold">Modal Title</h2>
              <p className="mt-2">
                {note ? `Note: ${note}` : "No note provided."} {approved ? `Approved by: ${approved}` : ""}
              </p>
              <button onClick={() => setOpenModal(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
