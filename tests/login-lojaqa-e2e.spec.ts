import { test, expect } from "playwright/test";

const BASE_URL = 'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login';

test.describe('Ato 1 - Validar carregamento e visibilidade de elementos', async() => {
  test('Validar título e carregamento da página', async({page}) => {
    // Navegar até a página de login
    await page.goto(`${BASE_URL}/login.html`);

    // Validar título
    await expect(page).toHaveTitle(/LojaQA | Entrar/i);
  });
  test('Verificar exibição dos campos do form de login', async({page}) => {
    // Navegar até a página de login
    await page.goto(`${BASE_URL}/login.html`);

    // Validar campos
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#loginBtn')).toBeVisible();

    // Validar se o botão estar desativado
    await expect(page.locator('#loginBtn')).toBeDisabled();
  });
});

test.describe('Ato 2 - Caminho Feliz', () => {
  test('Validar o acesso e redirecionar ao painel', async({page}) => {
    // Navegar até a página de login
    await page.goto(`${BASE_URL}/login.html`);

    // Preencher campos utilizando o fill()
    await page.fill('#email', 'pauloluz@gmail.com');
    await page.fill('#password', 'senhaconfiavel0000.');
    // Validar botão ativo
    await expect(page.locator('#loginBtn')).toBeEnabled();
    // Ação de clique no botão
    await page.click('#loginBtn');
    // Validar o redirecionamento para a página /painel
    await expect(page).toHaveURL(/painel\.html/);
  });

  test('Verificar botão login desativado quando email incorreto', async({page}) => {
    // Navegar até a página de login
    await page.goto(`${BASE_URL}/login.html`);

    // Preencher campos utilizando o fill()
    await page.fill('#email', 'pauloluz');
    await page.fill('#password', '123456789');
    // Validar botão ativo
    await expect(page.locator('#loginBtn')).toBeDisabled();
  });
});

test.describe('Ato 3 - Validar carregamento e visibilidade de elementos de cadastro', async() => {
  // O beforeEach faz com que esse bloco seja repetido todas as vezes em cada teste executado
  test.beforeEach(async({page}) => {
    // Navegar até a página de login
    await page.goto(`${BASE_URL}/login.html`);
    
    // Ação de clique no botão
    await page.getByRole('link', { name: 'Criar conta' }).click();

    // Validar título
    await expect(page).toHaveTitle(/QA System - Cadastro/i);
  });
  test('Criar usuário cliente', async({page}) => {
    // Preencher campos utilizando o fill()
    await page.fill('#reg-name', 'Usuário Valido');
    await page.fill('#reg-email', 'usuariovalido111@gmail.com');
    await page.fill('#reg-password', '123456789');
    await page.locator('#reg-role').selectOption('user');

    // Validar botão cadastrar ativo
    await expect(page.locator('#registerBtn')).toBeEnabled();
    // Ação de clique no botão
    await page.click('#registerBtn');
    await expect(page.locator('#statusMessage')).toBeVisible();
    await expect(page.locator('#statusMessage')).toContainText('Usuário cadastrado com sucesso!');
  });
  test('Criar usuário Lojista', async({page}) => {
    // Preencher campos utilizando o fill()
    await page.fill('#reg-name', 'Lojista Valido');
    await page.fill('#reg-email', 'lojistanovo0010@gmail.com');
    await page.fill('#reg-password', 'senhaconfiavel0000');
    await page.locator('#reg-role').selectOption('seller');
    await page.fill('#reg-store-name', 'Loja GTA VI');

    // Validar botão cadastrar ativo
    await expect(page.locator('#registerBtn')).toBeEnabled();
    // Ação de clique no botão
    await page.click('#registerBtn');
    await expect(page.locator('#statusMessage')).toBeVisible();
    await expect(page.locator('#statusMessage')).toContainText('Usuário cadastrado com sucesso!');
  });
});