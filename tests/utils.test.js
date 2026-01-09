
import { describe, it, expect } from 'vitest';
import { calculateTargetDimensions, calculateBulktargetDimensions } from '../js/utils.js';

describe('calculateTargetDimensions', () => {
    it('should calculate height based on width and aspect ratio', () => {
        const result = calculateTargetDimensions(800, 600, 4 / 3, 'width');
        expect(result.height).toBe(600);

        const result2 = calculateTargetDimensions(100, 100, 2, 'width'); // Aspect ratio 2:1
        expect(result2.height).toBe(50);
    });

    it('should calculate width based on height and aspect ratio', () => {
        const result = calculateTargetDimensions(800, 600, 4 / 3, 'height');
        expect(result.width).toBe(800);

        const result2 = calculateTargetDimensions(100, 50, 2, 'height'); // Aspect ratio 2:1
        expect(result2.width).toBe(100);
    });
});

describe('calculateBulktargetDimensions', () => {
    it('should return target dimensions directly if maintainAspectRatio is false', () => {
        const result = calculateBulktargetDimensions(1000, 500, 200, 200, false);
        expect(result).toEqual({ width: 200, height: 200 });
    });

    it('should fit image within target box maintaining aspect ratio (landscape)', () => {
        // Original 1000x500 (2:1). Target 200x200. Should become 200x100.
        const result = calculateBulktargetDimensions(1000, 500, 200, 200, true);
        expect(result).toEqual({ width: 200, height: 100 });
    });

    it('should fit image within target box maintaining aspect ratio (portrait)', () => {
        // Original 500x1000 (1:2). Target 200x200. Should become 100x200.
        const result = calculateBulktargetDimensions(500, 1000, 200, 200, true);
        expect(result).toEqual({ width: 100, height: 200 });
    });
});
