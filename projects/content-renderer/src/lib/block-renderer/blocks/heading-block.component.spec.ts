import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadingBlockDisplayComponent } from './heading-block.component';
import * as fc from 'fast-check';

describe('HeadingBlockDisplayComponent', () => {
    let component: HeadingBlockDisplayComponent;
    let fixture: ComponentFixture<HeadingBlockDisplayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeadingBlockDisplayComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(HeadingBlockDisplayComponent);
        component = fixture.componentInstance;
    });

    describe('Bug Condition Exploration - Property 1: HTML Links Render as Clickable Hyperlinks', () => {
        /**
         * **Validates: Requirements 1.1, 1.2, 2.1, 2.2**
         * 
         * CRITICAL: This test MUST FAIL on unfixed code - failure confirms the bug exists
         * 
         * This test verifies that heading text containing HTML anchor tags renders as
         * clickable hyperlinks with proper attributes, not as escaped text.
         * 
         * Expected counterexamples on unfixed code:
         * - Rendered output contains literal text like `&lt;a href=` instead of actual anchor elements
         * - No <a> elements exist in the DOM
         * - href and target attributes are not present
         */

        it('should render simple HTML anchor tag as clickable link', () => {
            // Arrange
            component.data = {
                text: '<a href="https://test.com" target="_blank">elementi</a>',
                level: 2
            };

            // Act
            fixture.detectChanges();
            const compiled = fixture.nativeElement as HTMLElement;
            const heading = compiled.querySelector('h2');
            const link = heading?.querySelector('a');

            // Assert - These assertions will FAIL on unfixed code
            expect(link).toBeTruthy('Expected to find an <a> element in the heading');
            expect(link?.getAttribute('href')).toBe('https://test.com');
            expect(link?.getAttribute('target')).toBe('_blank');
            expect(link?.textContent).toBe('elementi');
        });

        it('should render inline link within text as functional hyperlink', () => {
            // Arrange
            component.data = {
                text: 'Text with <a href="/docs">inline link</a> here',
                level: 3
            };

            // Act
            fixture.detectChanges();
            const compiled = fixture.nativeElement as HTMLElement;
            const heading = compiled.querySelector('h3');
            const link = heading?.querySelector('a');

            // Assert - These assertions will FAIL on unfixed code
            expect(link).toBeTruthy('Expected to find an <a> element in the heading');
            expect(link?.getAttribute('href')).toBe('/docs');
            expect(link?.textContent).toBe('inline link');
            expect(heading?.textContent).toContain('Text with');
            expect(heading?.textContent).toContain('here');
        });

        it('should render complex HTML with nested elements properly', () => {
            // Arrange
            component.data = {
                text: '<a href="https://example.com">Visit <strong>our site</strong></a>',
                level: 1
            };

            // Act
            fixture.detectChanges();
            const compiled = fixture.nativeElement as HTMLElement;
            const heading = compiled.querySelector('h1');
            const link = heading?.querySelector('a');
            const strong = link?.querySelector('strong');

            // Assert - These assertions will FAIL on unfixed code
            expect(link).toBeTruthy('Expected to find an <a> element in the heading');
            expect(link?.getAttribute('href')).toBe('https://example.com');
            expect(strong).toBeTruthy('Expected to find a <strong> element inside the link');
            expect(strong?.textContent).toBe('our site');
        });

        it('property: all heading text with HTML anchor tags should render as clickable links', () => {
            fc.assert(
                fc.property(
                    // Generate heading data with HTML anchor tags
                    fc.record({
                        text: fc.oneof(
                            // Simple link
                            fc.constant('<a href="https://test.com" target="_blank">elementi</a>'),
                            // Inline link
                            fc.constant('Text with <a href="/docs">inline link</a> here'),
                            // Link with nested HTML
                            fc.constant('<a href="https://example.com">Visit <strong>our site</strong></a>'),
                            // Link with different protocols
                            fc.constant('<a href="http://example.org">HTTP link</a>'),
                            // Link with relative path
                            fc.constant('<a href="../relative/path">Relative link</a>'),
                            // Link with query parameters
                            fc.constant('<a href="/search?q=test">Search link</a>')
                        ),
                        level: fc.integer({ min: 1, max: 4 })
                    }),
                    (data) => {
                        // Arrange
                        component.data = data;

                        // Act
                        fixture.detectChanges();
                        const compiled = fixture.nativeElement as HTMLElement;
                        const headingTag = `h${data.level}`;
                        const heading = compiled.querySelector(headingTag);
                        const link = heading?.querySelector('a');

                        // Assert - This property will FAIL on unfixed code
                        // The bug causes HTML to be escaped, so no <a> element exists
                        expect(link).toBeTruthy(
                            `Expected to find an <a> element in ${headingTag} for text: ${data.text}`
                        );
                        expect(link?.getAttribute('href')).toBeTruthy(
                            `Expected href attribute to be present for text: ${data.text}`
                        );
                    }
                ),
                { numRuns: 10 }
            );
        });
    });

    describe('Preservation - Property 2: Plain Text and Slug Generation Unchanged', () => {
        /**
         * **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
         * 
         * IMPORTANT: These tests should PASS on unfixed code
         * 
         * This test suite verifies that existing behavior is preserved:
         * - Plain text headings render correctly
         * - Slugify method strips HTML and creates valid URL-friendly slugs
         * - Heading levels (h1-h4) render with correct styling
         * - Scroll-margin-top behavior is maintained
         */

        it('should render plain text headings correctly', () => {
            // Arrange
            component.data = {
                text: 'Simple Heading',
                level: 2
            };

            // Act
            fixture.detectChanges();
            const compiled = fixture.nativeElement as HTMLElement;
            const heading = compiled.querySelector('h2');

            // Assert - Should PASS on unfixed code
            expect(heading).toBeTruthy();
            expect(heading?.textContent).toBe('Simple Heading');
            expect(heading?.querySelector('a')).toBeFalsy('Plain text should not contain anchor elements');
        });

        it('should generate valid URL-friendly slugs from text with HTML', () => {
            // Arrange - Observe actual behavior on unfixed code
            // The slugify method uses /[^\w ]+/g which removes non-word chars but keeps underscores
            const testCases = [
                { text: '<a href="test.com">Link Text</a>', expected: 'a-hreftestcomlink-texta' },
                { text: 'Heading with <strong>bold</strong>', expected: 'heading-with-strongboldstrong' },
                { text: 'Special!@#$%Characters', expected: 'specialcharacters' },
                { text: 'Multiple   Spaces', expected: 'multiple-spaces' }
            ];

            testCases.forEach(({ text, expected }) => {
                // Act
                const slug = component.slugify(text);

                // Assert - Should PASS on unfixed code
                expect(slug).toBe(expected);
            });
        });

        it('should render all heading levels with correct semantic HTML', () => {
            // Test all heading levels (1-4)
            [1, 2, 3, 4].forEach(level => {
                // Arrange
                component.data = {
                    text: `Level ${level} Heading`,
                    level: level
                };

                // Act
                fixture.detectChanges();
                const compiled = fixture.nativeElement as HTMLElement;
                const heading = compiled.querySelector(`h${level}`);

                // Assert - Should PASS on unfixed code
                expect(heading).toBeTruthy(`Expected to find h${level} element`);
                expect(heading?.textContent).toBe(`Level ${level} Heading`);
                expect(heading?.getAttribute('id')).toBe(`level-${level}-heading`);
            });
        });

        it('should maintain scroll-margin-top behavior', () => {
            // Arrange
            component.data = {
                text: 'Test Heading',
                level: 2
            };

            // Act
            fixture.detectChanges();
            const compiled = fixture.nativeElement as HTMLElement;
            const heading = compiled.querySelector('h2');

            // Assert - Should PASS on unfixed code
            expect(heading).toBeTruthy();
            const styles = window.getComputedStyle(heading!);
            expect(styles.scrollMarginTop).toBe('100px');
        });

        it('property: all plain text headings should render unchanged', () => {
            fc.assert(
                fc.property(
                    // Generate plain text headings without HTML tags
                    fc.record({
                        text: fc.oneof(
                            fc.string({ minLength: 1, maxLength: 50 }).filter(s => !s.includes('<') && !s.includes('>')),
                            fc.constant('Simple Heading'),
                            fc.constant('Heading with Numbers 123'),
                            fc.constant('Heading with Special Characters!'),
                            fc.constant('Multiple Words In Heading')
                        ),
                        level: fc.integer({ min: 1, max: 4 })
                    }),
                    (data) => {
                        // Arrange
                        component.data = data;

                        // Act
                        fixture.detectChanges();
                        const compiled = fixture.nativeElement as HTMLElement;
                        const headingTag = `h${data.level}`;
                        const heading = compiled.querySelector(headingTag);

                        // Assert - Should PASS on unfixed code
                        expect(heading).toBeTruthy(`Expected to find ${headingTag} element`);
                        expect(heading?.textContent).toBe(data.text);
                        expect(heading?.querySelector('a')).toBeFalsy('Plain text should not contain anchor elements');
                    }
                ),
                { numRuns: 20 }
            );
        });

        it('property: slugify should produce clean URL-friendly ids for all inputs', () => {
            fc.assert(
                fc.property(
                    // Generate various text inputs including those with HTML
                    fc.oneof(
                        fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
                        fc.constant('<a href="test.com">Link</a>'),
                        fc.constant('Text with <strong>HTML</strong>'),
                        fc.constant('Special!@#$%^&*()Characters'),
                        fc.constant('Multiple   Spaces   Here')
                    ),
                    (text) => {
                        // Act
                        const slug = component.slugify(text);

                        // Assert - Should PASS on unfixed code
                        // The slugify implementation uses /[^\w ]+/g which keeps word chars (letters, numbers, underscores)
                        // and replaces spaces with hyphens
                        // So the slug can contain lowercase letters, numbers, hyphens, and underscores
                        expect(slug).toMatch(/^[a-z0-9_-]*$/);
                        // Slug should not contain HTML angle brackets
                        expect(slug).not.toContain('<');
                        expect(slug).not.toContain('>');
                        // Slug should not have multiple consecutive hyphens
                        expect(slug).not.toMatch(/--+/);
                    }
                ),
                { numRuns: 50 }
            );
        });

        it('property: all heading levels should render with correct styling', () => {
            fc.assert(
                fc.property(
                    fc.record({
                        text: fc.string({ minLength: 1, maxLength: 30 }).filter(s => !s.includes('<')),
                        level: fc.integer({ min: 1, max: 4 })
                    }),
                    (data) => {
                        // Arrange
                        component.data = data;

                        // Act
                        fixture.detectChanges();
                        const compiled = fixture.nativeElement as HTMLElement;
                        const headingTag = `h${data.level}`;
                        const heading = compiled.querySelector(headingTag);

                        // Assert - Should PASS on unfixed code
                        expect(heading).toBeTruthy(`Expected to find ${headingTag} element`);

                        const styles = window.getComputedStyle(heading!);
                        expect(styles.scrollMarginTop).toBe('100px');
                        expect(styles.color).toBe('rgb(26, 29, 35)'); // #1a1d23

                        // Verify id attribute is set correctly
                        const expectedSlug = component.slugify(data.text);
                        expect(heading?.getAttribute('id')).toBe(expectedSlug);
                    }
                ),
                { numRuns: 20 }
            );
        });
    });
});
