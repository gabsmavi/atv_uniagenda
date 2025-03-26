// Configuração do Back4app
const APP_ID = 'MCU8RwP2QH3TCxcAZss2dpLgNgrLs5JAhz5xpCUr';
const JS_KEY = 'l6bME5hu692HoAFtvhYcY5dFeR4WhlejV7ATBbn4';
const API_BASE = 'https://parseapi.back4app.com/classes/Contatos';

// Inicializa o SDK do Parse
Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

// Funções da API
async function listarContatos() {
    const query = new Parse.Query('Contato');
    try {
        const results = await query.find();
        return results.map(c => c.toJSON());
    } catch (error) {
        console.error('Erro ao listar contatos:', error);
        return [];
    }
}

async function adicionarContato(contato) {
    // Validação
    if (!contato.nome?.trim() || !contato.telefone?.trim()) {
        throw new Error("Nome e telefone são obrigatórios!");
    }

    const Contato = Parse.Object.extend('Contato');
    const novoContato = new Contato();
    
    // Dados opcionais tratados
    novoContato.set('nome', contato.nome.trim());
    novoContato.set('telefone', contato.telefone.trim());
    novoContato.set('email', contato.email?.trim() || null);

    return await novoContato.save();
}

async function removerContato(id) {
    const query = new Parse.Query('Contato');
    try {
        const contato = await query.get(id);
        await contato.destroy();
        return true;
    } catch (error) {
        console.error('Erro ao remover contato:', error);
        return false;
    }
}