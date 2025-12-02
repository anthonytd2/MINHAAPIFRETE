// 1. Importar as ferramentas
const express = require('express');
const db = require('./db'); // Importa a conexão com o banco

// 2. Iniciar o Express
const app = express();

// 3. Habilitar leitura de JSON
app.use(express.json());

// 4. Rota de Teste
app.get('/', (req, res) => {
    res.send('API de Fretes está rodando com CRUD Completo!');
});

// =======================================================
// ROTAS PARA: CLIENTE
// =======================================================
// Listar TODOS os clientes
app.get('/clientes', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM cliente");
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar clientes.');
    }
});

// Buscar UM cliente pelo ID (A CORREÇÃO ESTÁ AQUI)
app.get('/clientes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.query("SELECT * FROM cliente WHERE id_cliente = ?", [id]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).send('Cliente não encontrado.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar cliente.');
    }
});

// Criar novo cliente
app.post('/clientes', async (req, res) => {
    try {
        const { id_usuario, nome, cnpj_cpf, email, telefone } = req.body;
        const sql = "INSERT INTO cliente (id_usuario, nome, cnpj_cpf, email, telefone) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [id_usuario, nome, cnpj_cpf, email, telefone]);
        res.status(201).send('Cliente criado!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar cliente.');
    }
});

// Atualizar cliente
app.put('/clientes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, telefone, email } = req.body;
        const sql = "UPDATE cliente SET nome = ?, telefone = ?, email = ? WHERE id_cliente = ?";
        const [result] = await db.query(sql, [nome, telefone, email, id]);
        if (result.affectedRows > 0) res.status(200).send('Cliente atualizado!');
        else res.status(404).send('Cliente não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar cliente.');
    }
});

// Deletar cliente
app.delete('/clientes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM cliente WHERE id_cliente = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) res.status(200).send('Cliente deletado!');
        else res.status(404).send('Cliente não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar cliente. Verifique se ele tem cargas vinculadas.');
    }
});

// =======================================================
// ROTAS PARA: USUARIO
// =======================================================
app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM usuario");
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar usuários.');
    }
});

// Buscar UM usuário pelo ID (Adicionado por precaução)
app.get('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.query("SELECT * FROM usuario WHERE id_usuario = ?", [id]);
        if (rows.length > 0) res.status(200).json(rows[0]);
        else res.status(404).send('Usuário não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar usuário.');
    }
});

app.post('/usuarios', async (req, res) => {
    try {
        const { nome_completo, email, senha_hash, tipo, documento, telefone } = req.body;
        const sql = "INSERT INTO usuario (nome_completo, email, senha_hash, tipo, documento, telefone) VALUES (?, ?, ?, ?, ?, ?)";
        await db.query(sql, [nome_completo, email, senha_hash, tipo, documento, telefone]);
        res.status(201).send('Usuário criado!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar usuário.');
    }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nome_completo, email, telefone } = req.body;
        const sql = "UPDATE usuario SET nome_completo = ?, email = ?, telefone = ? WHERE id_usuario = ?";
        const [result] = await db.query(sql, [nome_completo, email, telefone, id]);
        if (result.affectedRows > 0) res.status(200).send('Usuário atualizado!');
        else res.status(404).send('Usuário não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar usuário.');
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM usuario WHERE id_usuario = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) res.status(200).send('Usuário deletado!');
        else res.status(404).send('Usuário não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar usuário. Ele pode ter vínculos.');
    }
});

// =======================================================
// ROTAS PARA: ASSOCIADO
// =======================================================
app.get('/associados', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM associado");
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar associados.');
    }
});
app.post('/associados', async (req, res) => {
    try {
        const { id_usuario, nome, cnpj_cpf, email, telefone } = req.body;
        const sql = "INSERT INTO associado (id_usuario, nome, cnpj_cpf, email, telefone) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [id_usuario, nome, cnpj_cpf, email, telefone]);
        res.status(201).send('Associado criado!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar associado.');
    }
});
app.put('/associados/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, email, telefone } = req.body;
        const sql = "UPDATE associado SET nome = ?, email = ?, telefone = ? WHERE id_associado = ?";
        const [result] = await db.query(sql, [nome, email, telefone, id]);
        if (result.affectedRows > 0) res.status(200).send('Associado atualizado!');
        else res.status(404).send('Associado não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar associado.');
    }
});
app.delete('/associados/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM associado WHERE id_associado = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) res.status(200).send('Associado deletado!');
        else res.status(404).send('Associado não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar associado.');
    }
});

// =======================================================
// ROTAS PARA: MOTORISTA
// =======================================================
app.get('/motoristas', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM motorista");
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar motoristas.');
    }
});
app.post('/motoristas', async (req, res) => {
    try {
        const { id_associado, nome, cpf, cnh, telefone } = req.body;
        const sql = "INSERT INTO motorista (id_associado, nome, cpf, cnh, telefone) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [id_associado, nome, cpf, cnh, telefone]);
        res.status(201).send('Motorista criado!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar motorista.');
    }
});
app.put('/motoristas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, cnh, telefone } = req.body;
        const sql = "UPDATE motorista SET nome = ?, cnh = ?, telefone = ? WHERE id_motorista = ?";
        const [result] = await db.query(sql, [nome, cnh, telefone, id]);
        if (result.affectedRows > 0) res.status(200).send('Motorista atualizado!');
        else res.status(404).send('Motorista não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar motorista.');
    }
});
app.delete('/motoristas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM motorista WHERE id_motorista = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) res.status(200).send('Motorista deletado!');
        else res.status(404).send('Motorista não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar motorista.');
    }
});

// =======================================================
// ROTAS PARA: VEICULO
// =======================================================
app.get('/veiculos', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM veiculo");
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar veículos.');
    }
});
app.post('/veiculos', async (req, res) => {
    try {
        const { id_usuario, placa, renavam, tipo, capacidade_peso, capacidade_volume, ano_fabricacao, status } = req.body;
        const sql = "INSERT INTO veiculo (id_usuario, placa, renavam, tipo, capacidade_peso, capacidade_volume, ano_fabricacao, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        await db.query(sql, [id_usuario, placa, renavam, tipo, capacidade_peso, capacidade_volume, ano_fabricacao, status]);
        res.status(201).send('Veículo criado!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar veículo.');
    }
});
app.put('/veiculos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { status, tipo, capacidade_peso } = req.body;
        const sql = "UPDATE veiculo SET status = ?, tipo = ?, capacidade_peso = ? WHERE id_veiculo = ?";
        const [result] = await db.query(sql, [status, tipo, capacidade_peso, id]);
        if (result.affectedRows > 0) res.status(200).send('Veículo atualizado!');
        else res.status(404).send('Veículo não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar veículo.');
    }
});
app.delete('/veiculos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM veiculo WHERE id_veiculo = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) res.status(200).send('Veículo deletado!');
        else res.status(404).send('Veículo não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar veículo.');
    }
});

// =======================================================
// ROTAS PARA: CARGA
// =======================================================
app.get('/cargas', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM carga");
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar cargas.');
    }
});

// Buscar UMA carga pelo ID (Adicionado por precaução)
app.get('/cargas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const [rows] = await db.query("SELECT * FROM carga WHERE id_carga = ?", [id]);
        if (rows.length > 0) res.status(200).json(rows[0]);
        else res.status(404).send('Carga não encontrada.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar carga.');
    }
});

app.post('/cargas', async (req, res) => {
    try {
        const { id_cliente, origem_cidade, origem_estado, destino_cidade, destino_estado, descricao, peso, volume, tipo_carga, status } = req.body;
        const sql = "INSERT INTO carga (id_cliente, origem_cidade, origem_estado, destino_cidade, destino_estado, descricao, peso, volume, tipo_carga, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        await db.query(sql, [id_cliente, origem_cidade, origem_estado, destino_cidade, destino_estado, descricao, peso, volume, tipo_carga, status]);
        res.status(201).send('Carga criada!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar carga.');
    }
});
app.put('/cargas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { status, descricao, peso } = req.body;
        const sql = "UPDATE carga SET status = ?, descricao = ?, peso = ? WHERE id_carga = ?";
        const [result] = await db.query(sql, [status, descricao, peso, id]);
        if (result.affectedRows > 0) res.status(200).send('Carga atualizada!');
        else res.status(404).send('Carga não encontrada.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar carga.');
    }
});
app.delete('/cargas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM carga WHERE id_carga = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) res.status(200).send('Carga deletada!');
        else res.status(404).send('Carga não encontrada.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar carga.');
    }
});

// =======================================================
// ROTAS PARA: PROPOSTA
// =======================================================
app.get('/propostas', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM proposta");
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar propostas.');
    }
});
app.post('/propostas', async (req, res) => {
    try {
        const { id_carga, id_associado, valor_proposta, prazo_estimado, observacoes, status } = req.body;
        const sql = "INSERT INTO proposta (id_carga, id_associado, valor_proposta, prazo_estimado, observacoes, status) VALUES (?, ?, ?, ?, ?, ?)";
        await db.query(sql, [id_carga, id_associado, valor_proposta, prazo_estimado, observacoes, status]);
        res.status(201).send('Proposta criada!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar proposta.');
    }
});
app.put('/propostas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { valor_proposta, status, observacoes } = req.body;
        const sql = "UPDATE proposta SET valor_proposta = ?, status = ?, observacoes = ? WHERE id_proposta = ?";
        const [result] = await db.query(sql, [valor_proposta, status, observacoes, id]);
        if (result.affectedRows > 0) res.status(200).send('Proposta atualizada!');
        else res.status(404).send('Proposta não encontrada.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar proposta.');
    }
});
app.delete('/propostas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM proposta WHERE id_proposta = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) res.status(200).send('Proposta deletada!');
        else res.status(404).send('Proposta não encontrada.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar proposta.');
    }
});

// =======================================================
// ROTAS PARA: CONTRATO
// =======================================================
app.get('/contratos', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM contrato");
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar contratos.');
    }
});
app.post('/contratos', async (req, res) => {
    try {
        const { id_proposta, status } = req.body;
        const sql = "INSERT INTO contrato (id_proposta, status) VALUES (?, ?)";
        await db.query(sql, [id_proposta, status]);
        res.status(201).send('Contrato criado!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar contrato.');
    }
});
app.put('/contratos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const sql = "UPDATE contrato SET status = ? WHERE id_contrato = ?";
        const [result] = await db.query(sql, [status, id]);
        if (result.affectedRows > 0) res.status(200).send('Contrato atualizado!');
        else res.status(404).send('Contrato não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar contrato.');
    }
});
app.delete('/contratos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM contrato WHERE id_contrato = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) res.status(200).send('Contrato deletado!');
        else res.status(404).send('Contrato não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar contrato.');
    }
});

// =======================================================
// ROTAS PARA: PAGAMENTO
// =======================================================
app.get('/pagamentos', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM pagamento");
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar pagamentos.');
    }
});
app.post('/pagamentos', async (req, res) => {
    try {
        const { id_contrato, valor, status, data_vencimento, metodo } = req.body;
        const sql = "INSERT INTO pagamento (id_contrato, valor, status, data_vencimento, metodo) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [id_contrato, valor, status, data_vencimento, metodo]);
        res.status(201).send('Pagamento criado!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar pagamento.');
    }
});
app.put('/pagamentos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { status, metodo } = req.body;
        const sql = "UPDATE pagamento SET status = ?, metodo = ? WHERE id_pagamento = ?";
        const [result] = await db.query(sql, [status, metodo, id]);
        if (result.affectedRows > 0) res.status(200).send('Pagamento atualizado!');
        else res.status(404).send('Pagamento não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar pagamento.');
    }
});
app.delete('/pagamentos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM pagamento WHERE id_pagamento = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) res.status(200).send('Pagamento deletado!');
        else res.status(404).send('Pagamento não encontrado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar pagamento.');
    }
});

// =======================================================
// ROTAS PARA: AVALIACAO
// =======================================================
app.get('/avaliacoes', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM avaliacao");
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar avaliações.');
    }
});
app.post('/avaliacoes', async (req, res) => {
    try {
        const { id_avaliador, id_avaliado, nota, comentario } = req.body;
        const sql = "INSERT INTO avaliacao (id_avaliador, id_avaliado, nota, comentario) VALUES (?, ?, ?, ?)";
        await db.query(sql, [id_avaliador, id_avaliado, nota, comentario]);
        res.status(201).send('Avaliação criada!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar avaliação.');
    }
});
app.put('/avaliacoes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nota, comentario } = req.body;
        const sql = "UPDATE avaliacao SET nota = ?, comentario = ? WHERE id_avaliacao = ?";
        const [result] = await db.query(sql, [nota, comentario, id]);
        if (result.affectedRows > 0) res.status(200).send('Avaliação atualizada!');
        else res.status(404).send('Avaliação não encontrada.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar avaliação.');
    }
});
app.delete('/avaliacoes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM avaliacao WHERE id_avaliacao = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) res.status(200).send('Avaliação deletada!');
        else res.status(404).send('Avaliação não encontrada.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao deletar avaliação.');
    }
});

// --- LIGAR O SERVIDOR ---
const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`API (Garçom) está de pé e ouvindo na porta ${PORTA}`);
    console.log(`Acesse http://localhost:${PORTA} no seu navegador.`);
});