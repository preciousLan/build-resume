import ClassicTemplate from '@/public/templates/ClassicTemplate';
import MinimalImageTemplate from '@/public/templates/MinimalImageTemplate';
import MinimalTemplate from '@/public/templates/MinimalTemplate';
import ModernTemplate from '@/public/templates/ModernTemplate';
import React from 'react'

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {

  const renderTemplate = () => {
    switch (template) {
      case "classic":
        return <ClassicTemplate data={data} accentColor={accentColor} />;
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  }


  return (
    <div className='w-full bg-gray-100'>
      <div id='resume-preview' className={"border border-gray-200 print:shadow-none print:border-none" + classes}>
        {renderTemplate()}
      </div>

      <style jsx>{`
  /* ===== Page setup ===== */
  @page {
    size: letter;
    margin: 0;
  }

  /* ===== Print reset ===== */
@media print {
  /* Hide EVERYTHING */
  body * {
    visibility: hidden;
  }

  /* Show ONLY the resume */
  #resume-preview,
  #resume-preview * {
    visibility: visible;
  }

  /* Position resume properly */
  #resume-preview {
    position: absolute;
    left: 0;
    top: 0;
    width: 8.5in;
    min-height: 11in;
    padding: 0.5in;
    background: white;
    box-shadow: none;
    border: none;
  }

  /* Color accuracy */
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Page setup */
  @page {
    size: letter;
    margin: 0;
  }
}

`}</style>

    </div>
  )
}

export default ResumePreview