"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useState } from "react"

interface FormInputs {
  name: string
  email: string
  phone: string
  reason: string
}

interface SignUpFormProps {
  onSubmit: () => void
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>()

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [confirmationMessage, setConfirmationMessage] = useState<string>("")
  const [showForm, setShowForm] = useState(true)

  const handleFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    setSubmitStatus("loading")
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setConfirmationMessage(result.message)
        setShowForm(false)
        reset()
        onSubmit()
      } else if (response.status === 409) {
        setSubmitStatus("success")
        setConfirmationMessage(result.message)
        setShowForm(false)
      } else {
        throw new Error(result.error || "Submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
      setConfirmationMessage(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.")
    }
  }

  const formFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "reason", label: "Reason of Interest", type: "textarea" },
  ]

  const textStyle = {
    textShadow: "0 1px 2px rgba(0,0,0,0.7)",
  }

  return (
    <AnimatePresence>
      {showForm ? (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 rounded-lg shadow-xl mx-auto"
          style={{
            background: "linear-gradient(45deg, rgba(0,0,0,0.4), rgba(20,20,20,0.4))",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 215, 0, 0.4)",
          }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Sign Up</h2>

            {formFields.map((field) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {field.type === "textarea" ? (
                  <textarea
                    {...register(field.name as keyof FormInputs, {
                      required: `${field.label} is required`,
                    })}
                    className="w-full px-4 py-2 bg-black/20 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-white placeholder-yellow-200/50"
                    placeholder={field.label}
                    rows={4}
                    style={textStyle}
                  />
                ) : (
                  <input
                    {...register(field.name as keyof FormInputs, {
                      required: `${field.label} is required`,
                    })}
                    type={field.type}
                    className="w-full px-4 py-2 bg-black/20 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-white placeholder-yellow-200/50"
                    placeholder={field.label}
                    style={textStyle}
                  />
                )}
                {errors[field.name as keyof FormInputs] && (
                  <span className="text-red-500 text-sm">{errors[field.name as keyof FormInputs]?.message}</span>
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              className="px-4 py-2 text-white font-bold bg-[#395256] rounded-md hover:bg-[#395256]/90 transition-colors duration-300 mx-auto block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={submitStatus === "loading"}
            >
              {submitStatus === "loading" ? "Submitting..." : "Join the Waitlist"}
            </motion.button>

            {submitStatus === "error" && (
              <p className="text-red-500 text-center mt-4">
                Error: {confirmationMessage}. Please try again or contact support if the issue persists.
              </p>
            )}
          </div>
        </motion.form>
      ) : (
        <motion.div
          key="confirmation"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 rounded-lg shadow-xl mx-auto text-center"
          style={{
            background: "linear-gradient(45deg, rgba(0,0,0,0.4), rgba(20,20,20,0.4))",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 215, 0, 0.4)",
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-yellow-300">{confirmationMessage}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

