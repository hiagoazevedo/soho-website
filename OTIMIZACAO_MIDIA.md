# Guia de Otimização de Imagens e Vídeos

Este documento lista todas as imagens e vídeos que precisam ser otimizados para melhorar a performance do site.

## 📊 Impacto Esperado
- **Economia estimada**: ~1,919 KiB (aproximadamente 1.9 MB)
- **Melhoria no LCP**: Redução significativa no tempo de carregamento
- **Melhoria no Speed Index**: Site mais rápido

---

## 🖼️ IMAGENS PARA OTIMIZAR

### Prioridade ALTA (Críticas - Aparecem no First Paint)

#### 1. `assets/foto-servicos.png`
- **Tamanho atual**: 930.5 KiB
- **Economia estimada**: 922.9 KiB
- **Dimensões atuais**: 878x660px
- **Dimensões de exibição**: 310x150px
- **Otimizações necessárias**:
  - ✅ Converter para **WebP** ou **AVIF**
  - ✅ Redimensionar para **310x150px** (ou 620x300px para retina)
  - ✅ Comprimir com qualidade 80-85%
  - ✅ Criar versão 2x para telas retina (620x300px)
- **Arquivos finais**:
  - `foto-servicos.webp` (310x150px)
  - `foto-servicos@2x.webp` (620x300px) - opcional

#### 2. `assets/Sobre-2.jpeg`
- **Tamanho atual**: 511.7 KiB
- **Economia estimada**: 494.7 KiB
- **Dimensões atuais**: 1200x1497px
- **Dimensões de exibição**: 280x373px
- **Otimizações necessárias**:
  - ✅ Converter para **WebP** ou **AVIF**
  - ✅ Redimensionar para **280x373px** (ou 560x746px para retina)
  - ✅ Comprimir com qualidade 80-85%
  - ✅ Criar versão 2x para telas retina (560x746px)
- **Arquivos finais**:
  - `Sobre-2.webp` (280x373px)
  - `Sobre-2@2x.webp` (560x746px) - opcional

#### 3. `assets/Sobre-1.jpeg`
- **Dimensões de exibição**: 280x350px
- **Otimizações necessárias**:
  - ✅ Converter para **WebP** ou **AVIF**
  - ✅ Redimensionar para **280x350px** (ou 560x700px para retina)
  - ✅ Comprimir com qualidade 80-85%

#### 4. `assets/Sobre-3.jpeg`
- **Dimensões de exibição**: 280x350px
- **Otimizações necessárias**:
  - ✅ Converter para **WebP** ou **AVIF**
  - ✅ Redimensionar para **280x350px** (ou 560x700px para retina)
  - ✅ Comprimir com qualidade 80-85%

#### 5. `assets/Sobre-4.jpeg`
- **Dimensões de exibição**: 280x350px
- **Otimizações necessárias**:
  - ✅ Converter para **WebP** ou **AVIF**
  - ✅ Redimensionar para **280x350px** (ou 560x700px para retina)
  - ✅ Comprimir com qualidade 80-85%

#### 6. `assets/logo-horizontal-off-white-fundo-transparente.png`
- **Dimensões de exibição**: ~400x220px (ajustado no CSS)
- **Otimizações necessárias**:
  - ✅ Converter para **WebP** ou **SVG** (se for logo simples)
  - ✅ Se PNG, converter para WebP com transparência
  - ✅ Redimensionar se necessário
  - ✅ Comprimir com qualidade 90-95% (logo precisa de alta qualidade)

### Prioridade MÉDIA (Aparecem abaixo da dobra)

#### 7. `assets/submarca-secundária-off-white-fundo-transparente.png`
- **Dimensões de exibição**: 1920x300px (full width)
- **Otimizações necessárias**:
  - ✅ Converter para **WebP** ou **SVG**
  - ✅ Redimensionar se necessário
  - ✅ Comprimir com qualidade 85-90%

#### 8. Imagens do portfolio (página Produção de Conteúdo)
- Localização: `assets/portfolio/`
- **Otimizações necessárias**:
  - ✅ Converter todas as imagens para **WebP**
  - ✅ Redimensionar para tamanhos apropriados
  - ✅ Comprimir com qualidade 80-85%

#### 9. Imagens de influenciadoras (página Agenciamento)
- Localização: `assets/agenciamento/`
- **Otimizações necessárias**:
  - ✅ Converter todas as imagens para **WebP**
  - ✅ Redimensionar para tamanhos apropriados
  - ✅ Comprimir com qualidade 80-85%

#### 10. Logos de marcas
- Localização: `assets/agenciamento/logos-marcas/`
- **Otimizações necessárias**:
  - ✅ Converter para **WebP** ou **SVG** (se possível)
  - ✅ Redimensionar para tamanhos apropriados
  - ✅ Comprimir com qualidade 90-95% (logos precisam de alta qualidade)

---

## 🎥 VÍDEOS PARA OTIMIZAR

### Prioridade ALTA (Crítico - Aparece no Hero)

#### 1. `assets/hero-vid.MOV`
- **Problema**: Formato MOV pode ser pesado e não otimizado
- **Otimizações necessárias**:
  - ✅ Converter para **MP4** (codec H.264)
  - ✅ Reduzir qualidade para 1080p ou 720p (dependendo do tamanho original)
  - ✅ Bitrate: 2-4 Mbps para 1080p, 1-2 Mbps para 720p
  - ✅ Frame rate: 30fps (reduzir se original for 60fps)
  - ✅ Duração: Considerar reduzir se for muito longo (>15s)
  - ✅ Criar versão mobile otimizada (720p ou menor)
- **Ferramentas recomendadas**: HandBrake, FFmpeg, Adobe Media Encoder

### Prioridade MÉDIA (Portfolio - Carregamento lazy)

#### 2. Vídeos do portfolio (index.html)
- Localização: `assets/index-portfolio/`
- **Arquivos**:
  - `video-1-zeekr-rio.mp4`
  - `video-2-stuppendo-rio.mp4`
  - `video-3-stuppendo-rio.mp4`
  - `video-4-outlander.mp4`
  - `video-5-proart-nirvana.mp4`
  - `video-6-saliss.mov` ⚠️ (converter para MP4)
  - `video-7-logaf.mp4`
  - `video-8-future.mp4`
  - `video-9-mabruk.mp4`
  - `video-10-halzi.mp4`
  - `video-11-future.mp4`
  - `video-12-abbout.mp4`
- **Otimizações necessárias**:
  - ✅ Converter `.mov` para `.mp4`
  - ✅ Reduzir resolução para 720p ou 1080p (dependendo do tamanho de exibição)
  - ✅ Bitrate: 1-2 Mbps
  - ✅ Frame rate: 30fps
  - ✅ Duração: Considerar reduzir para loops curtos (5-10s)
  - ✅ Otimizar codec H.264

#### 3. Vídeos de portfólio de influenciadoras
- Localização: `assets/agenciamento/portfolio-*/`
- **Otimizações necessárias**:
  - ✅ Converter todos os `.mov` para `.mp4`
  - ✅ Reduzir resolução se necessário
  - ✅ Otimizar bitrate e frame rate
  - ✅ Considerar prévia (thumbnail) para lazy loading

#### 4. Vídeo sobre (se existir)
- Localização: `assets/video-sobre.MOV`
- **Otimizações necessárias**:
  - ✅ Converter para MP4
  - ✅ Reduzir qualidade se necessário
  - ✅ Otimizar bitrate

---

## 🛠️ FERRAMENTAS RECOMENDADAS

### Para Imagens:
1. **Squoosh** (https://squoosh.app/) - Online, gratuito
2. **ImageOptim** (Mac) ou **FileOptimizer** (Windows) - Desktop
3. **Sharp** (Node.js) - Para automação
4. **GIMP** ou **Photoshop** - Para edição avançada

### Para Vídeos:
1. **HandBrake** - Gratuito, multiplataforma
2. **FFmpeg** - Linha de comando, muito poderoso
3. **Adobe Media Encoder** - Se tiver acesso
4. **CloudConvert** - Online, para conversões rápidas

---

## 📝 COMANDOS ÚTEIS (FFmpeg)

### Converter vídeo para MP4 otimizado:
```bash
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 128k -movflags +faststart output.mp4
```

### Redimensionar e otimizar vídeo:
```bash
ffmpeg -i input.mp4 -vf scale=1920:1080 -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 128k output.mp4
```

### Criar versão mobile (720p):
```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 96k output_720p.mp4
```

---

## ✅ CHECKLIST DE OTIMIZAÇÃO

### Imagens:
- [ ] Converter todas as imagens críticas para WebP
- [ ] Redimensionar imagens para tamanhos de exibição
- [ ] Criar versões 2x para telas retina (quando necessário)
- [ ] Comprimir com qualidade apropriada
- [ ] Testar visualmente antes de substituir
- [ ] Atualizar referências no HTML após conversão

### Vídeos:
- [ ] Converter todos os .mov para .mp4
- [ ] Otimizar bitrate e resolução
- [ ] Reduzir frame rate se necessário
- [ ] Criar versão mobile do vídeo do hero
- [ ] Adicionar poster/thumbnail para vídeos lazy
- [ ] Testar reprodução em diferentes navegadores

---

## 📊 RESULTADOS ESPERADOS

Após a otimização:
- ✅ Redução de ~1.9 MB no tamanho total de assets
- ✅ Melhoria significativa no LCP (Largest Contentful Paint)
- ✅ Melhoria no Speed Index
- ✅ Melhor experiência em conexões lentas
- ✅ Redução no uso de dados móveis

---

## 🔄 ATUALIZAÇÃO NO HTML

Após converter as imagens para WebP, você precisará atualizar o HTML para usar os novos arquivos:

**Exemplo para foto-servicos.png:**
```html
<!-- ANTES -->
<img src="assets/foto-servicos.png" ...>

<!-- DEPOIS (com fallback) -->
<picture>
    <source srcset="assets/foto-servicos.webp, assets/foto-servicos@2x.webp 2x" type="image/webp">
    <img src="assets/foto-servicos.png" ...>
</picture>
```

Ou simplesmente substituir (se suportar WebP):
```html
<img src="assets/foto-servicos.webp" ...>
```

---

**Última atualização**: Após aplicação das otimizações de performance
**Prioridade**: Implementar conforme lista acima (Alta → Média → Baixa)

