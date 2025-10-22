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

Após obter todas as informações, execute no console do navegador:

```javascript
window.updateEmailJSConfig(
    'SEU_SERVICE_ID',     // Service ID do passo 2
    'SEU_TEMPLATE_ID',    // Template ID do passo 3
    'SUA_PUBLIC_KEY'      // Public Key do passo 4
);
```

## Exemplo de Configuração

```javascript
window.updateEmailJSConfig(
    'service_abc123',
    'template_xyz789',
    'user_abc123def456'
);
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
- **Configuração persistente**: A configuração fica salva no navegador
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