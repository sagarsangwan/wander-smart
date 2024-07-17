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
import { Button } from '../ui/button';
function CreateTripButton() {
    return (
        <div className="py-40  flex items-center justify-center">
            <Modal>
                <ModalTrigger className="">
                    <Button className="group/create-trip-modal-button flex justify-center">
                        <span className="group-hover/create-trip-modal-button:translate-x-40 text-center transition duration-500">
                            Book your trip
                        </span>
                        <div className="-translate-x-40 group-hover/create-trip-modal-button:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                            ✈️
                        </div>
                    </Button>
                </ModalTrigger>
                <ModalBody>
                    <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            Book your trip to{" "}
                            <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                                Bali
                            </span>{" "}
                            now! ✈️
                        </h4>
                    </ModalContent>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default CreateTripButton
