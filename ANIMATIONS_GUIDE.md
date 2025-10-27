# 🎭 Guia de Animações - Soho Agency

## 📋 **O que foi implementado**

### 🎬 **1. Scroll Animations**

#### **Hero Section - Reveal Animation**
- **O que faz**: O título principal aparece suavemente de baixo para cima
- **Arquivo**: `css/animations.css` - `.hero-title`
- **Duração**: 1.2s com delay de 0.5s
- **Easing**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

#### **About Section - Staggered Image Animation**
- **O que faz**: As 4 imagens aparecem sequencialmente com rotação sutil
- **Arquivo**: `css/animations.css` - `.about-image-item`
- **Delay escalonado**: 0.1s, 0.3s, 0.5s, 0.7s
- **Efeito**: Movimento de esquerda para direita + rotação

#### **Services Section - Slide In from Sides**
- **O que faz**: Coluna esquerda vem da esquerda, direita vem da direita
- **Arquivo**: `css/animations.css` - `.services-left`, `.services-right`
- **Duração**: 1s
- **Efeito**: Deslizamento horizontal suave

#### **Portfolio Videos - Scale & Fade**
- **O que faz**: Vídeos aparecem com escala crescente
- **Arquivo**: `css/animations.css` - `.video-item`
- **Duração**: 0.6s
- **Efeito**: Escala de 0.8 para 1.0 + fade in

#### **Influencer Cards - Staggered Grid Animation**
- **O que faz**: Cards aparecem sequencialmente de baixo para cima
- **Arquivo**: `css/animations.css` - `.influencer-card`
- **Delay escalonado**: 0.1s a 0.6s
- **Efeito**: Movimento vertical + escala sutil
- **Hover**: Elevação suave (sem 3D tilt)

### ⏳ **2. Loading States**

#### **Page Load - Elegant Fade In**
- **O que faz**: Página inteira aparece suavemente ao carregar
- **Arquivo**: `css/animations.css` - `body`
- **Duração**: 1.5s
- **Efeito**: Fade in completo da página

#### **Video Loading - Skeleton Placeholder**
- **O que faz**: Shimmer effect enquanto vídeos carregam
- **Arquivo**: `css/animations.css` - `.hero-video::before`
- **Duração**: 2s infinito
- **Efeito**: Gradiente deslizante

#### **Form Submission Loading**
- **O que faz**: Botão mostra estado de carregamento ao enviar
- **Arquivo**: `css/animations.css` - `.submit-btn.loading`
- **Efeito**: Texto "ENVIANDO..." com pulse animation

#### **Image Loading - Progressive Reveal**
- **O que faz**: Imagens aparecem com blur que vai sumindo
- **Arquivo**: `css/animations.css` - `.about-img`, `.influencer-image img`
- **Efeito**: Blur 5px → blur 0px + escala 1.1 → 1.0

### 🎯 **3. Microinterações**

~~#### **Filter Buttons - Elegant Hover**~~ **REMOVIDO**
- ~~O hover personalizado foi removido para manter o estilo original~~

#### **Service Items - Magnetic Effect**
- **O que faz**: Items se movem para direita no hover
- **Arquivo**: `css/animations.css` - `.service-item`
- **Efeito**: Movimento horizontal + mudança de cor

~~#### **Influencer Cards - 3D Tilt Effect**~~ **MODIFICADO**
- **O que faz**: Apenas elevação suave no hover (3D tilt removido)
- **Arquivo**: `css/animations.css` - `.influencer-card:hover`
- **Efeito**: Apenas translateY (sem rotação 3D)

~~#### **Navigation - Smooth Reveal**~~ **REMOVIDO**
- ~~A linha verde debaixo dos links foi removida para manter o hover original~~

#### **About Button - Elegant Hover**
- **O que faz**: Botão e seta se movem para direita
- **Arquivo**: `css/animations.css` - `.about-btn`
- **Efeito**: Movimento horizontal + seta acompanha

#### **Contact Form - Elegant Focus States**
- **O que faz**: Inputs sobem e ganham sombra no foco
- **Arquivo**: `css/animations.css` - `.contact-form input:focus`
- **Efeito**: Movimento vertical + sombra

## 🎛️ **Sistema de Controle**

### **Painel de Controle (Desenvolvimento)**
- **Localização**: Aparece apenas em localhost/127.0.0.1
- **Posição**: Canto superior direito
- **Funcionalidades**:
  - ✅/❌ Scroll Animations
  - ✅/❌ Loading States  
  - ✅/❌ Microinterações
  - ✅/❌ Hero Animation
  - 🔄 Botão Reset

### **Persistência**
- **LocalStorage**: Configurações são salvas automaticamente
- **Aplicação**: Configurações são aplicadas na próxima visita
- **Reset**: Botão reset volta tudo ao padrão

## 🎨 **Personalização**

### **Desabilitar Todas as Animações**
```css
.no-animations * {
    animation: none !important;
    transition: none !important;
    transform: none !important;
}
```

### **Desabilitar Apenas Scroll Animations**
```css
.no-scroll-animations .about-image-item,
.no-scroll-animations .services-left,
.no-scroll-animations .services-right,
.no-scroll-animations .video-item,
.no-scroll-animations .influencer-card,
.no-scroll-animations .team-member {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
}
```

### **Desabilitar Apenas Microinterações**
```css
.no-microinteractions .filter-option:hover,
.no-microinteractions .service-item:hover,
.no-microinteractions .influencer-card:hover,
.no-microinteractions .nav-link:hover,
.no-microinteractions .about-btn:hover,
.no-microinteractions .contact-form input:focus,
.no-microinteractions .contact-form textarea:focus {
    transform: none !important;
}
```

## 📱 **Responsividade**

### **Mobile (< 768px)**
- Animações reduzidas para melhor performance
- Efeitos 3D simplificados
- Durações de transição menores

### **Acessibilidade**
- Respeita `prefers-reduced-motion: reduce`
- Desabilita automaticamente para usuários que preferem movimento reduzido
- Mantém funcionalidade sem animações

## 🔧 **Arquivos Criados/Modificados**

### **Novos Arquivos**
- `css/animations.css` - Todas as animações CSS
- `js/animations.js` - Controle JavaScript das animações
- `ANIMATIONS_GUIDE.md` - Este guia

### **Arquivos Modificados**
- `index.html` - Adicionado links para animações
- `sobre.html` - Adicionado links para animações
- `agenciamento.html` - Adicionado links para animações
- `gestao-redes.html` - Adicionado links para animações
- `producao-conteudo.html` - Adicionado links para animações

## 🎯 **Como Testar**

1. **Abra o site em localhost**
2. **Veja o painel de controle no canto superior direito**
3. **Teste cada checkbox para ver o efeito**
4. **Use o botão Reset para voltar ao padrão**
5. **Teste em diferentes dispositivos e tamanhos de tela**

## 🚀 **Próximos Passos**

1. **Teste todas as animações**
2. **Escolha quais manter/remover**
3. **Ajuste durações se necessário**
4. **Personalize cores/easing se desejar**
5. **Remova o painel de controle em produção**

---

**Criado por**: Assistant AI  
**Data**: Dezembro 2024  
**Versão**: 1.0

## 🎯 **Mudanças Recentes**

### ✅ **Removido**
- Hover dos botões de filtro (mantido estilo original)
- Efeito 3D tilt nos cards das influenciadoras (mantido apenas elevação)
- Linha verde nos links do header (mantido hover original)

### ✅ **Mantido**
- Animação de entrada dos cards (de baixo para cima)
- Elevação suave no hover dos cards
- Todas as outras animações


