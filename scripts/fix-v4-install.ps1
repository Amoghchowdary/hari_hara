# Run from the existing hari_hara repository root; repairs copied V4 source in place.
$ErrorActionPreference = 'Stop'
if (!(Test-Path '.\.git')) { throw 'Open PowerShell in the cloned hari_hara repository first.' }
if (!(Test-Path '.\vite.config.ts')) { throw 'Missing vite.config.ts' }
if (!(Test-Path '.\src\routeTree.gen.ts')) { throw 'Missing route tree' }

npm pkg delete 'devDependencies.@tanstack/router-plugin'
if ($LASTEXITCODE -ne 0) { throw 'Failed to update package.json' }

$vite = Get-Content '.\vite.config.ts' -Raw
$vite = $vite -replace '(?m)^.*import\s+\{\s*tanstackRouter\s*\}\s+from\s+["'']@tanstack/router-plugin/vite["''];\s*\r?\n', ''
$vite = $vite -replace '(?m)^\s*tanstackRouter\(\{[^\n]*\}\),\s*\r?\n', ''
if ($vite -match 'tanstackRouter\(' -or $vite -match '@tanstack/router-plugin') { throw 'Vite plugin reference remains; manual review required' }
Set-Content '.\vite.config.ts' -Value $vite -Encoding UTF8

Remove-Item '.\package-lock.json' -Force -ErrorAction SilentlyContinue
Remove-Item '.\node_modules' -Recurse -Force -ErrorAction SilentlyContinue
npm install
if ($LASTEXITCODE -ne 0) { throw 'npm install failed; do not push' }
npm run verify
if ($LASTEXITCODE -ne 0) { throw 'Verification failed; do not push' }
Write-Host 'Install and verification passed. Review git status before pushing.'
