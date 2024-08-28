const fs = require('fs');
const path = require('path');
const tileCount = 3 * 3;  // 9 tiles
const { exec } = require('child_process');

// Define the path to your shell script
const scriptPath = path.join(__dirname, 'resize.sh');
const SVGScriptPath = path.join(__dirname, 'moveicons.sh');

exec(`sh ${SVGScriptPath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing script: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Script stderr: ${stderr}`);
        return;
    }
    console.log(`Script stdout: ${stdout}`);
});


// Execute the shell script
exec(`sh ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing script: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Script stderr: ${stderr}`);
        return;
    }
    console.log(`Script stdout: ${stdout}`);

    // Paths
    const imagesDir = path.join(__dirname, 'dist', 'images');
    const templatePath = path.join(__dirname, 'src', 'index.template.html');
    const outputPath = path.join(__dirname, 'dist', 'index.html');

    // Read the template file
    const template = fs.readFileSync(templatePath, 'utf-8');

    // Get list of images
    const images = fs.readdirSync(imagesDir).filter(file => 
        file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif')
    );

    // Throw an error if no images are found
    if (images.length === 0) {
        throw new Error('No images found in the directory. Ensure that the "images" folder contains image files.');
    }

    // Log the images array (for debugging)
    console.log(images);

    // Generate the array of image objects
    const newImages = images.map(image => {
        const imagePath = path.join('./images', image);
        return { src: imagePath };
    });

    // Log the resulting array (to verify the output)
    console.log('const newImages =', JSON.stringify(newImages, null, 2), ';');

    // If you want to insert this array into your template or save it somewhere, you can do so here
    // For example, replacing a placeholder in your template:
    const finalHTML = template.replace('{{IMAGE_ARRAY}}', `const newImages = ${JSON.stringify(newImages, null, 2)};`);

    // Write the final HTML to the output file
    fs.writeFileSync(outputPath, finalHTML, 'utf-8');

    console.log('Build complete: index.html has been generated with the latest images.');
});