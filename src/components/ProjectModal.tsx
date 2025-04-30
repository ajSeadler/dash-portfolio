import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import { Project } from 'src/data/projectData';

type ProjectModalProps = {
  open: boolean;
  onClose: () => void;
  project: Project | null;
};

const ProjectModal = ({ open, onClose, project }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showFullImage, setShowFullImage] = useState(false);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  // Reset full image on modal close
  useEffect(() => {
    if (!open) {
      setShowFullImage(false);
    }
  }, [open]);

  if (!open || !project) return null;

  return createPortal(
    <>
      {/* Full Image View */}
      {showFullImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center"
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={project.img}
              alt="Full view"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            />
            <button
              onClick={() => setShowFullImage(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <Icon icon="mdi:close" height={28} />
            </button>
          </div>
        </div>
      )}

      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
        <div
          ref={modalRef}
          className="bg-white dark:bg-darkgray p-6 rounded-2xl shadow-2xl max-w-3xl w-full transition-all space-y-6"
        >
          {/* Header */}
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-primary">{project.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <Icon icon="mdi:close" height={24} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image */}
            <div className="w-full lg:w-1/2 cursor-zoom-in" onClick={() => setShowFullImage(true)}>
              <img
                src={project.img}
                alt={project.name}
                className="rounded-xl shadow-lg object-cover w-full h-auto"
              />
            </div>

            {/* Details */}
            <div className="flex-1 text-[15px] space-y-5 text-gray-700 dark:text-gray-300">
              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-1">Stack</p>
                <p className="leading-relaxed">{project.owner}</p>
              </div>

              <div>
                <p className="font-medium text-gray-900 dark:text-white mb-1">Description</p>
                <p className="leading-relaxed text-[14px] text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
              </div>

              {project.link !== '#' && (
                <div>
                  <p className="font-medium text-gray-900 dark:text-white mb-1">Project Link</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline font-medium gap-1"
                  >
                    <Icon icon="mdi:link-variant" height={18} />
                    Visit project
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ProjectModal;
