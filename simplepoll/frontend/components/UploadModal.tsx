'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: PollData) => void;
}

interface PollData {
  title: string;
  description: string;
  options: string[];
  duration: number;
}

export default function UploadModal({
  isOpen,
  onClose,
  onSubmit,
}: UploadModalProps) {
  const [formData, setFormData] = useState<PollData>({
    title: '',
    description: '',
    options: ['', ''],
    duration: 7,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, ''],
    });
  };

  const removeOption = (index: number) => {
    const newOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      alert('Please enter a poll title');
      return;
    }

    const validOptions = formData.options.filter((opt) => opt.trim());
    if (validOptions.length < 2) {
      alert('Please provide at least 2 options');
      return;
    }

    // Submit with only valid options
    onSubmit?.({
      ...formData,
      options: validOptions,
    });
    
    setFormData({
      title: '',
      description: '',
      options: ['', ''],
      duration: 7,
    });
    onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 50,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* @ts-ignore */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* @ts-ignore */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50 border-6 border-neo-black bg-neo-white shadow-neo-2xl"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-ranade text-3xl font-bold">CREATE POLL</h2>
                <button
                  onClick={onClose}
                  className="text-4xl font-bold text-neo-black hover:text-neo-blue transition-colors w-10 h-10 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block font-ranade font-bold text-sm uppercase mb-3">
                    Poll Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="What's the question?"
                    required
                    className="w-full border-4 border-neo-black p-4 font-inter text-base focus:outline-none focus:border-neo-blue"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block font-ranade font-bold text-sm uppercase mb-3">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={handleDescriptionChange}
                    placeholder="Add more context..."
                    rows={3}
                    className="w-full border-4 border-neo-black p-4 font-inter text-base focus:outline-none focus:border-neo-blue resize-none"
                  />
                </div>

                {/* Options */}
                <div>
                  <label className="block font-ranade font-bold text-sm uppercase mb-3">
                    Poll Options
                  </label>
                  <div className="space-y-3">
                    {formData.options.map((option, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 items-center"
                      >
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(idx, e.target.value)
                          }
                          placeholder={`Option ${idx + 1}`}
                          required
                          className="flex-1 border-4 border-neo-black p-3 font-inter text-sm focus:outline-none focus:border-neo-blue"
                        />
                        {formData.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(idx)}
                            className="border-4 border-neo-red bg-neo-red text-neo-white p-3 font-bold hover:bg-red-700 transition-colors"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addOption}
                    className="mt-4 w-full border-4 border-neo-black bg-neo-white p-3 font-ranade font-bold text-sm uppercase hover:bg-neo-blue hover:text-neo-white transition-all"
                  >
                    + Add Option
                  </button>
                </div>

                {/* Duration */}
                <div>
                  <label className="block font-ranade font-bold text-sm uppercase mb-3">
                    Poll Duration (Days)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: parseInt(e.target.value),
                      })
                    }
                    min="1"
                    max="365"
                    className="w-full border-4 border-neo-black p-4 font-inter text-base focus:outline-none focus:border-neo-blue"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6 border-t-4 border-neo-black">
                  <button
                    type="submit"
                    className="flex-1 border-4 border-neo-black bg-neo-yellow text-neo-black p-4 font-ranade font-bold text-base uppercase shadow-neo hover:shadow-neo-lg transition-all"
                  >
                    Create Poll
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border-4 border-neo-black bg-neo-white text-neo-black p-4 font-ranade font-bold text-base uppercase shadow-neo hover:shadow-neo-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
