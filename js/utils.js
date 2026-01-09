
export function calculateTargetDimensions(currentWidth, currentHeight, aspectRatio, changedDimension) {
    let targetWidth = currentWidth;
    let targetHeight = currentHeight;

    if (changedDimension === 'width') {
        targetHeight = Math.round(currentWidth / aspectRatio);
    } else if (changedDimension === 'height') {
        targetWidth = Math.round(currentHeight * aspectRatio);
    }

    return { width: targetWidth, height: targetHeight };
}

export function calculateBulktargetDimensions(originalWidth, originalHeight, targetWidth, targetHeight, maintainAspectRatio) {
    if (!maintainAspectRatio) {
        return { width: targetWidth, height: targetHeight };
    }

    const originalAspectRatio = originalWidth / originalHeight;
    let finalWidth = targetWidth;
    let finalHeight = targetHeight;

    if (targetWidth / targetHeight > originalAspectRatio) {
        finalWidth = Math.round(targetHeight * originalAspectRatio);
    } else {
        finalHeight = Math.round(targetWidth / originalAspectRatio);
    }

    return { width: finalWidth, height: finalHeight };
}
