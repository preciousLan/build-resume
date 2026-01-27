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
    body {
      margin: 0;
      padding: 0;
      background: white;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Hide app UI */
    nav,
    header,
    footer,
    button {
      display: none !important;
    }

    /* Resume wrapper */
    #resume-preview {
      width: 8.5in;
      min-height: 11in;
      margin: 0;
      padding: 0.5in;
      box-shadow: none;
      border-radius: 0;
      background: white;
    }

    /* Typography */
    h1, h2, h3 {
      page-break-after: avoid;
    }

    p, li {
      page-break-inside: avoid;
    }

    section {
      page-break-inside: avoid;
    }
  }
`}</style>

    </div>
  )
}

export default ResumePreview