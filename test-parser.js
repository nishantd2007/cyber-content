const fs = require('fs');

function test(filename) {
  const content = fs.readFileSync(`content/${filename}`, 'utf8');
  
  const mediumMarker = '## 📝 Medium Article';
  const footerMarker = '\n---\n\n*Last Updated';
  
  const mediumStart = content.indexOf(mediumMarker);
  const footerStart = content.indexOf(footerMarker, mediumStart);
  
  let mediumContent = '';
  if (mediumStart !== -1) {
    const mediumEndIndex = footerStart !== -1 ? footerStart : content.length;
    const mediumSection = content.substring(mediumStart, mediumEndIndex);
    
    const lines = mediumSection.split('\n');
    const filteredLines = lines.filter((line, index) => index >= 3);
    mediumContent = filteredLines.join('\n').trim();
  }
  
  const words = mediumContent.split(/\s+/).filter(w => w.length > 0).length;
  console.log(`${filename}: ${words} words`);
  console.log(`First 150 chars: ${mediumContent.substring(0, 150)}...`);
}

fs.readdirSync('content').filter(f => f.endsWith('.md')).slice(0, 3).forEach(test);
