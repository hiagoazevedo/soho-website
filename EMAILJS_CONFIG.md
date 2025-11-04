# Configuração do EmailJS para Formulário de Contato

## Passo 1: Criar Conta no EmailJS

1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Faça login no painel de controle

## Passo 2: Configurar Serviço de Email

1. No painel, vá para **"Services"**
2. Clique em **"Add Service"**
3. Escolha seu provedor de email (Gmail, Outlook, etc.)
4. Siga as instruções para conectar sua conta
5. **Anote o Service ID** (exemplo: `service_abc123`)

## Passo 3: Criar Template de Email

1. No painel, vá para **"Templates"**
2. Clique em **"Create New Template"**
3. Configure o template com as seguintes variáveis:

```
Assunto: Nova mensagem do site Soho Agency

Corpo do email:
---
Nova mensagem recebida através do site:

Nome: {{from_name}}
Email: {{from_email}}
Serviço de interesse: {{service_type}}
Data/Hora: {{timestamp}}

Mensagem:
{{message}}
---
```

4. **Anote o Template ID** (exemplo: `template_xyz789`)

## Passo 4: Obter Public Key

1. No painel, vá para **"Account"**
2. Na seção **"General"**, copie a **Public Key**
3. **Anote a Public Key** (exemplo: `user_abc123def456`)

## Passo 5: Configurar no Site

Após obter todas as informações, edite o arquivo `script.js` e atualize o objeto `EMAILJS_CONFIG`:

1. Abra o arquivo `script.js`
2. Localize a constante `EMAILJS_CONFIG` (por volta da linha 225)
3. Substitua os valores pelos seus IDs:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'SEU_SERVICE_ID',     // Service ID do passo 2
    templateId: 'SEU_TEMPLATE_ID',   // Template ID do passo 3
    publicKey: 'SUA_PUBLIC_KEY'      // Public Key do passo 4
};
```

## Exemplo de Configuração

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'service_abc123',
    templateId: 'template_xyz789',
    publicKey: 'user_abc123def456'
};
```

## Testar o Formulário

1. Abra o site no navegador
2. Navegue até a seção de contato
3. Preencha o formulário
4. Clique em "ENVIAR MENSAGEM"
5. Verifique se recebeu o email na sua caixa de entrada

## Observações

- **Limite gratuito**: 200 emails/mês
- **Planos pagos**: Disponíveis para mais volume
- **Configuração**: A configuração é feita diretamente no código
- **Logs**: Verifique o console do navegador para debugar problemas

## Troubleshooting

Se o formulário não estiver funcionando:

1. Verifique se todos os IDs estão corretos
2. Abra o console do navegador (F12) e veja se há erros
3. Certifique-se de que o serviço está ativo no EmailJS
4. Verifique se não há bloqueadores de popup/script

## Suporte

Para problemas específicos do EmailJS, consulte:
- [Documentação oficial](https://www.emailjs.com/docs/)
- [FAQ](https://www.emailjs.com/docs/faq/) 

<!-- function initializeBannersAnimation() {
        const bannersSection = document.querySelector('.ramos-banners');
        if (!bannersSection) {
            return; // Exit if not on produção de conteúdo page
        }
        
        // Get all banner items except the first one (which stays static)
        const bannerItems = bannersSection.querySelectorAll('.banner-item:not(:first-child)');
        
        if (bannerItems.length === 0) {
            return;
        }
        
        // Create intersection observer for individual banners
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animate class to the specific banner
                    entry.target.classList.add('animate');
                    
                    // Unobserve after animation to prevent re-triggering
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the banner is visible
            rootMargin: '0px 0px -50px 0px' // Start animation when banner is closer to viewport
        });
        
        // Start observing each banner individually
        bannerItems.forEach(banner => {
            observer.observe(banner);
        });
    } -->