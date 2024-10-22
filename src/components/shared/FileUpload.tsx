'use client'

import React, { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react'
import { cloneDeep, remove } from 'lodash'
import clsx from 'clsx'
import CloseIcon from 'public/assets/vector-icons/close.svg'
import Image from 'next/image'

type UploadedFile = { url: string; file: File | undefined }

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  allowMultipleFiles?: boolean
  onUpload?: (uploadedFiles: UploadedFile[]) => void
  previewUrl?: string
  sortable?: boolean
  isUploading?: boolean
}

const FileUpload = forwardRef<HTMLInputElement, Props>(function FileUpload(
  { id, allowMultipleFiles = false, previewUrl = '', onUpload = () => {}, className = '' },
  ref
) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(
    previewUrl ? [{ url: previewUrl, file: undefined }] : []
  )

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const uploads: UploadedFile[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!file) continue
        const url = URL.createObjectURL(file)
        uploads.push({ url, file })
      }
      const newFiles = allowMultipleFiles ? uploadedFiles.concat(uploads) : uploads
      setUploadedFiles(newFiles)
      onUpload(newFiles)
    }
  }

  const handleRemoveFile = (uploadedFile: UploadedFile) => {
    const deepClonedUploadedFiles = cloneDeep(uploadedFiles)
    remove(deepClonedUploadedFiles, (file) => file.url === uploadedFile.url)
    setUploadedFiles(deepClonedUploadedFiles)
    onUpload(deepClonedUploadedFiles)
    URL.revokeObjectURL(uploadedFile.url)
  }

  useEffect(() => {
    if (previewUrl) {
      const previewFile = [{ url: previewUrl, file: undefined as unknown as File }]
      setUploadedFiles(previewFile)
      onUpload(previewFile)
    }
  }, [onUpload, previewUrl])

  return (
    <div className={clsx('flex flex-col justify-center', className)}>
      {uploadedFiles.length > 0 && (
        <div>
          {uploadedFiles.map((uploadedFile) => (
            <div key={uploadedFile.url}>
              {uploadedFile.file?.type.includes('pdf') ? (
                <embed src={uploadedFile.url} width='100%' height='100%' />
              ) : (
                <div className='w-[100px] h-[100px] z-1 overflow-hidden rounded-[50%]'>
                  <Image src={uploadedFile.url} className='preview-image' width={500} height={500} alt='' />
                </div>
              )}
              <button className='close-button' onClick={() => handleRemoveFile(uploadedFile)}>
                <CloseIcon className='close-icon' />
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        id={id}
        type='file'
        multiple={allowMultipleFiles}
        className='-z-1 w-[95px] bg-grey-200 rounded-md cursor-pointer'
        onChange={handleFileChange}
        ref={(el) => {
          // Use a callback ref to set the ref correctly
          if (ref && typeof ref === 'function') {
            ref(el)
          } else if (ref) {
            ref.current = el // Ensure type safety
          }
        }}
      />
    </div>
  )
})

export default FileUpload
