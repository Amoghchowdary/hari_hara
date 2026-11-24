# Read-only production diagnostic; no DNS or GitHub settings modified.
$domain = "www.hariharafabrictionsandconstructions.in"
$root = "hariharafabrictionsandconstructions.in"
Write-Host "Checking DNS for $domain"
try { Resolve-DnsName -Name $domain -Type CNAME -ErrorAction Stop | Format-Table Name,NameHost } catch { Write-Warning "www CNAME unresolved or no CNAME response: $_" }
try { Resolve-DnsName -Name $root -Type A -ErrorAction Stop | Format-Table Name,IPAddress } catch { Write-Warning "Apex A records unresolved: $_" }
foreach ($path in @("/", "/favicon.ico", "/favicon-32x32.png", "/robots.txt", "/sitemap.xml")) {
  $url = "https://$domain$path"
  try {
    $res = Invoke-WebRequest -Uri $url -UseBasicParsing -MaximumRedirection 5 -TimeoutSec 20 -ErrorAction Stop
    Write-Host "PASS $($res.StatusCode) $url ($($res.Headers['Content-Type']))"
    if ($path -eq "/") {
      if ($res.Content -match '/hari_hara/assets/') { Write-Warning "Incorrect repository asset base detected" }
      if ($res.Content -match 'src="/assets/') { Write-Host "Compiled JS asset reference detected" }
    }
  } catch {
    Write-Warning "FAIL $url : $_"
  }
}
Write-Host "For certificate issues: Settings > Pages > Custom domain; confirm DNS verified then enable Enforce HTTPS."
