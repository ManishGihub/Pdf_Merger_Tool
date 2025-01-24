import PDFMerger from 'pdf-merger-js';

const merger = new PDFMerger();

const mergePdf = async (p1,p2) => {
  await merger.add(p1);  // Merge all pages
  await merger.add(p2);
  let d = new Date().getTime()
  await merger.save(`public/${d}.pdf`); // Save the merged file
  return d
};

export { mergePdf };
