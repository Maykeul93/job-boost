'use client';

import { ResumeData } from '@/types';
import { EyeIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const renderModernTemplate = () => (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-[800px] mx-auto">
      {/* Header */}
      <div className="text-center border-b border-gray-200 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.basics.firstName} {data.basics.lastName}
        </h1>
        <p className="text-xl text-blue-600 font-medium mb-3">
          {data.basics.title || 'Titre du poste'}
        </p>
        <p className="text-gray-600 mb-4">
          {data.basics.summary || 'Résumé professionnel...'}
        </p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.basics.contacts.email && (
            <span>{data.basics.contacts.email}</span>
          )}
          {data.basics.contacts.phone && (
            <span>{data.basics.contacts.phone}</span>
          )}
          {data.basics.location.city && (
            <span>{data.basics.location.city}, {data.basics.location.country}</span>
          )}
        </div>
      </div>

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Expérience Professionnelle
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                  <span className="text-sm text-gray-500">
                    {exp.start} - {exp.end || 'Présent'}
                  </span>
                </div>
                <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm">{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Formation
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-blue-600">{edu.school}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {edu.start} - {edu.end || 'Présent'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Compétences
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Projets
          </h2>
          <div className="space-y-3">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return renderModernTemplate();
      case 'classic':
        return renderModernTemplate(); // TODO: Implement classic template
      case 'creative':
        return renderModernTemplate(); // TODO: Implement creative template
      case 'minimal':
        return renderModernTemplate(); // TODO: Implement minimal template
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Aperçu du CV</h3>
        <div className="flex gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <EyeIcon className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <DocumentArrowDownIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-2 text-sm text-gray-600">Aperçu - {template}</span>
          </div>
        </div>
        
        <div className="p-4 overflow-auto max-h-[600px]">
          {renderTemplate()}
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>💡 Modifiez les informations à gauche pour voir les changements en temps réel</p>
      </div>
    </div>
  );
}
