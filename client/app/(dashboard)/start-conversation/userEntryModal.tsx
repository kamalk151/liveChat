"use client"
import React, { useEffect, useState } from "react"
import { getUserDetails, saveUserDetails } from "./storageHandler"
import { STORAGE_KEY } from "../../constant"

interface ModalProps {
  show: boolean
  onClose: () => void
  title: string
}

export default function UserEntryModal({
  show,
  onClose,
  title
}: ModalProps) {
  const [name, setName] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [error, setError] = useState<any>({})
  const [userDetails, setUserDetails] = useState<any>({})

  useEffect(() => {
    // This runs only on the client
    setUserDetails(getUserDetails('userDetails'))
  }, [])

  if (userDetails?.name || !show) {
    return
  }

  const handleUserForm = () => {
    if (!name.trim()) {
      setError({ name: "Name is required." })
      return
    } else if (!gender) {
      setError({ gender: "Gender is required." })
      return
    }
    setError("")
    saveUserDetails({ name, gender }, STORAGE_KEY.userDetails)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md animate__animated animate__fadeIn">
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h3 className="text-lg font-semibold"> { title } </h3>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
          />
        </div>
        <div className="modal-body">
          <div className="p-4">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value.trim())}
              placeholder="Enter your name*"
              className="w-full border rounded px-3 py-2 mb-2"
              required
            />
            {error?.name?.trim() && (
              <div className="text-red-600 text-sm mt-1">{error.name}</div>
            )}
          </div>
          <div className="p-4">
            <select
              value={gender}
              onChange={e => setGender(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Choose gender *</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {error?.gender?.trim() && (
              <div className="text-red-600 text-sm mt-1">{error?.gender}</div>
            )}
          </div>
        </div>
        <div className="flex justify-end border-t px-4 py-2">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-5 py-2 transition"
            onClick={handleUserForm}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
