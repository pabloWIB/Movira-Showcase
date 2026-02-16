const fs = require('fs');
const path = require('path');

class MinimalProjectAnalyzer {
    constructor(projectPath = '.') {
        this.projectPath = path.resolve(projectPath);
        this.results = {
            project: {},
            structure: {}
        };

        this.excludePatterns = [
            'node_modules', '.next', '.git', 'dist', 'build', '.cache',
            '*.log', '*.map', '.DS_Store', 'Thumbs.db'
        ];
    }

    shouldExclude(filePath) {
        const relativePath = path.relative(this.projectPath, filePath);
        return this.excludePatterns.some(pattern =>
            relativePath.includes(pattern.replace('*', ''))
        );
    }

    getFileType(filePath) {
        const ext = path.extname(filePath);
        const relativePath = path.relative(this.projectPath, filePath);

        if (relativePath.startsWith('app/') && (ext === '.tsx' || ext === '.jsx')) return 'page';
        if (relativePath.startsWith('pages/') && (ext === '.tsx' || ext === '.jsx')) return 'page';
        if (relativePath.includes('components/')) return 'component';
        if (relativePath.startsWith('lib/')) return 'lib';
        if (relativePath.includes('api/')) return 'api';
        if (relativePath.startsWith('public/')) return 'asset';
        if (ext === '.css' || ext === '.scss') return 'style';
        if (ext === '.json') return 'config';
        if (ext === '.md') return 'doc';
        if (['.png', '.jpg', '.svg'].includes(ext)) return 'image';
        if (ext === '.sql') return 'sql';

        return 'file';
    }

    scanDirectory(dirPath = this.projectPath, level = 0) {
        if (level > 6) return {};

        const structure = {};

        try {
            const items = fs.readdirSync(dirPath);

            for (const item of items) {
                const fullPath = path.join(dirPath, item);

                if (this.shouldExclude(fullPath)) continue;

                const stats = fs.statSync(fullPath);

                if (stats.isDirectory()) {
                    const relativePath = path.relative(this.projectPath, fullPath);
                    const importantDirs = ['app', 'pages', 'components', 'lib', 'utils', 'styles', 'public', 'api', 'database', 'src'];

                    if (level === 0 || importantDirs.some(dir => relativePath.startsWith(dir))) {
                        const subdirectory = this.scanDirectory(fullPath, level + 1);
                        if (Object.keys(subdirectory).length > 0) {
                            structure[item] = subdirectory;
                        }
                    }
                } else {
                    const ext = path.extname(item);
                    if (['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.md', '.sql', '.png', '.jpg', '.svg'].includes(ext)) {
                        structure[item] = this.getFileType(fullPath);
                    }
                }
            }
        } catch (error) {
            // Ignore errors
        }

        return structure;
    }

    getProjectInfo() {
        try {
            const packagePath = path.join(this.projectPath, 'package.json');
            if (!fs.existsSync(packagePath)) {
                return { error: 'No package.json found' };
            }

            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

            return {
                name: packageJson.name || 'unknown',
                version: packageJson.version || '0.0.0',
                nextjs: packageJson.dependencies?.next || null,
                react: packageJson.dependencies?.react || null,
                typescript: !!(packageJson.dependencies?.typescript || packageJson.devDependencies?.typescript),
                mainDeps: Object.keys(packageJson.dependencies || {}),
                scripts: Object.keys(packageJson.scripts || {}),
                hasSupabase: !!packageJson.dependencies?.['@supabase/supabase-js'],
                hasPrisma: !!(packageJson.dependencies?.['@prisma/client'] || packageJson.devDependencies?.prisma),
                hasTailwind: !!(packageJson.dependencies?.tailwindcss || packageJson.devDependencies?.tailwindcss)
            };
        } catch (error) {
            return { error: 'Could not read package.json' };
        }
    }

    analyze() {
        this.results.project = this.getProjectInfo();
        this.results.structure = this.scanDirectory();
        return this.results;
    }

    saveResults(outputPath = 'project-minimal.json') {
        fs.writeFileSync(outputPath, JSON.stringify(this.results, null, 2));
    }
}

async function main() {
    try {
        const projectPath = process.argv[2] || '.';
        const outputPath = process.argv[3] || 'project-minimal.json';

        const analyzer = new MinimalProjectAnalyzer(projectPath);
        analyzer.analyze();
        analyzer.saveResults(outputPath);
    } catch (error) {
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = MinimalProjectAnalyzer;