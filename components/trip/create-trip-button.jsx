"use client"
import React from 'react'
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "../ui/animated-modal";
import { motion } from "framer-motion";
function CreateTripButton() {
    return (
        <div className="">
            <Modal>
                <ModalTrigger className="bg-primary flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-white text-center transition duration-500">
                        Book your trip
                    </span>
                    <p className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        ✈️
                    </p>
                </ModalTrigger>
                <ModalBody>
                    <ModalContent>
                        <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            Book your trip
                        </p>
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default CreateTripButton
