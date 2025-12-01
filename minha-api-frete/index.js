// 1. Importar as ferramentas
const express = require('express');
const db = require('./db'); // Importa o "telefone" (conexão)

// 2. Iniciar o Express (contratar o "Garçom")
const app = express();

// 3. Ensinar o Garçom a ler JSON (importante para POST e PUT)
app.use(express.json());

// 4. Rota de Teste (só para ver se ele está vivo)
app.get('/', (req, res) => {
    res.send('O Garçom (API) está online e funcionando!');
});

// --- CARDÁPIO DE ROTAS PARA "CLIENTE" ---
app.get('/clientes', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM cliente");
        res.status(200).json(rows);
    } catch (err) {
        console.log("Erro na Cozinha (GET /clientes):", err);
        res.status(500).send('Erro ao buscar clientes.');
    }
});
app.post('/clientes', async (req, res) => {
    try {
        // Lembrete: id_usuario deve existir na tabela 'usuario'
        const { id_usuario, nome, cnpj_cpf, email, telefone } = req.body;
        const sql = "INSERT INTO cliente (id_usuario, nome, cnpj_cpf, email, telefone) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [id_usuario, nome, cnpj_cpf, email, telefone]);
        res.status(201).send('Cliente criado com sucesso!');
    } catch (err) {
        console.log("Erro na Cozinha (POST /clientes):", err);
        res.status(500).send('Erro ao criar cliente.');
    }
});
app.put('/clientes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, telefone, email } = req.body; // Atualizar 3 campos
        const sql = "UPDATE cliente SET nome = ?, telefone = ?, email = ? WHERE id_cliente = ?";
        const [result] = await db.query(sql, [nome, telefone, email, id]);
        if (result.affectedRows > 0) {
            res.status(200).send('Cliente atualizado com sucesso!');
        } else {
            res.status(404).send('Cliente não encontrado.');
        }
    } catch (err) {
        console.log("Erro na Cozinha (PUT /clientes):", err);
        res.status(500).send('Erro ao atualizar cliente.');
    }
});
app.delete('/clientes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM cliente WHERE id_cliente = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) {
            res.status(200).send('Cliente deletado com sucesso!');
        } else {
            res.status(404).send('Cliente não encontrado.');
        }
    } catch (err) {
        // CUIDADO: Pode falhar se um 'cliente' for "pai" de uma 'carga'
        console.log("Erro na Cozinha (DELETE /clientes):", err);
        res.status(500).send('Erro ao deletar cliente.');
    }
});

// --- CARDÁPIO DE ROTAS PARA "USUARIO" ---
app.get('/usuarios', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM usuario");
        res.status(200).json(rows);
    } catch (err) {
        console.log("Erro na Cozinha (GET /usuarios):", err);
        res.status(500).send('Erro ao buscar usuários.');
    }
});
app.post('/usuarios', async (req, res) => {
    try {
        const { nome_completo, email, senha_hash, tipo, documento, telefone } = req.body;
        const sql = "INSERT INTO usuario (nome_completo, email, senha_hash, tipo, documento, telefone) VALUES (?, ?, ?, ?, ?, ?)";
        await db.query(sql, [nome_completo, email, senha_hash, tipo, documento, telefone]);
        res.status(201).send('Usuário criado com sucesso!');
    } catch (err) {
        console.log("Erro na Cozinha (POST /usuarios):", err);
        res.status(500).send('Erro ao criar usuário.');
    }
});
app.put('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nome_completo, email, telefone } = req.body;
        const sql = "UPDATE usuario SET nome_completo = ?, email = ?, telefone = ? WHERE id_usuario = ?";
        const [result] = await db.query(sql, [nome_completo, email, telefone, id]);
        if (result.affectedRows > 0) {
            res.status(200).send('Usuário atualizado com sucesso!');
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    } catch (err) { 
        console.log("Erro na Cozinha (PUT /usuarios):", err);
        res.status(500).send('Erro ao atualizar usuário.');
    }
});
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM usuario WHERE id_usuario = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) {
            res.status(200).send('Usuário deletado com sucesso!');
        } else {
            res.status(404).send('Usuário não encontrado.');
        }
    } catch (err) { 
        // CUIDADO: Pode falhar se um 'usuario' for "pai" de um 'cliente' ou 'associado'
        console.log("Erro na Cozinha (DELETE /usuarios):", err);
        res.status(500).send('Erro ao deletar usuário.');
    }
});

// --- CARDÁPIO DE ROTAS PARA "ASSOCIADO" ---
app.get('/associados', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM associado");
        res.status(200).json(rows);
    } catch (err) {
        console.log("Erro na Cozinha (GET /associados):", err);
        res.status(500).send('Erro ao buscar associados.');
    }
});
app.post('/associados', async (req, res) => {
    try {
        // Lembrete: id_usuario deve existir na tabela 'usuario'
        const { id_usuario, nome, cnpj_cpf, email, telefone } = req.body;
        const sql = "INSERT INTO associado (id_usuario, nome, cnpj_cpf, email, telefone) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [id_usuario, nome, cnpj_cpf, email, telefone]);
        res.status(201).send('Associado criado com sucesso!');
    } catch (err) {
        console.log("Erro na Cozinha (POST /associados):", err);
        res.status(500).send('Erro ao criar associado.');
    }
});
// (PUT e DELETE para associado seguem a mesma lógica de cliente)

// --- CARDÁPIO DE ROTAS PARA "MOTORISTA" ---
app.get('/motoristas', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM motorista");
        res.status(200).json(rows);
    } catch (err) {
        console.log("Erro na Cozinha (GET /motoristas):", err);
        res.status(500).send('Erro ao buscar motoristas.');
    }
});
app.post('/motoristas', async (req, res) => {
    try {
        // Lembrete: id_associado deve existir na tabela 'associado'
        const { id_associado, nome, cpf, cnh, telefone } = req.body;
        const sql = "INSERT INTO motorista (id_associado, nome, cpf, cnh, telefone) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [id_associado, nome, cpf, cnh, telefone]);
        res.status(201).send('Motorista criado com sucesso!');
    } catch (err) {
        console.log("Erro na Cozinha (POST /motoristas):", err);
        res.status(500).send('Erro ao criar motorista.');
    }
});
app.put('/motoristas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nome, cnh, telefone } = req.body; 
        const sql = "UPDATE motorista SET nome = ?, cnh = ?, telefone = ? WHERE id_motorista = ?";
        const [result] = await db.query(sql, [nome, cnh, telefone, id]);
        if (result.affectedRows > 0) {
            res.status(200).send('Motorista atualizado com sucesso!');
        } else {
            res.status(404).send('Motorista não encontrado.');
        }
    } catch (err) { 
        console.log("Erro na Cozinha (PUT /motoristas):", err);
        res.status(500).send('Erro ao atualizar motorista.');
    }
});
app.delete('/motoristas/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sql = "DELETE FROM motorista WHERE id_motorista = ?";
        const [result] = await db.query(sql, [id]);
        if (result.affectedRows > 0) {
            res.status(200).send('Motorista deletado com sucesso!');
        } else {
            res.status(404).send('Motorista não encontrado.');
        }
    } catch (err) { 
        console.log("Erro na Cozinha (DELETE /motoristas):", err);
        res.status(500).send('Erro ao deletar motorista.');
    }
});

// --- CARDÁPIO DE ROTAS PARA "VEICULO" ---
app.get('/veiculos', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM veiculo");
        res.status(200).json(rows);
    } catch (err) {
        console.log("Erro na Cozinha (GET /veiculos):", err);
        res.status(500).send('Erro ao buscar veículos.');
    }
});
app.post('/veiculos', async (req, res) => {
    try {
        // Lembrete: id_usuario deve existir na tabela 'usuario' (provavelmente um associado)
        const { id_usuario, placa, renavam, tipo, capacidade_peso, capacidade_volume, ano_fabricacao, status } = req.body;
        const sql = "INSERT INTO veiculo (id_usuario, placa, renavam, tipo, capacidade_peso, capacidade_volume, ano_fabricacao, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        await db.query(sql, [id_usuario, placa, renavam, tipo, capacidade_peso, capacidade_volume, ano_fabricacao, status]);
        res.status(201).send('Veículo criado com sucesso!');
    } catch (err) {
        console.log("Erro na Cozinha (POST /veiculos):", err);
        res.status(500).send('Erro ao criar veículo.');
    }
});
// (PUT e DELETE para veiculo seguem a mesma lógica)

// --- CARDÁPIO DE ROTAS PARA "CARGA" ---
app.get('/cargas', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM carga");
        res.status(200).json(rows);
    } catch (err) {
        console.log("Erro na Cozinha (GET /cargas):", err);
        res.status(500).send('Erro ao buscar cargas.');
    }
});
app.post('/cargas', async (req, res) => {
    try {
        // Lembrete: id_cliente deve existir na tabela 'cliente'
        const { id_cliente, origem_cidade, origem_estado, destino_cidade, destino_estado, descricao, peso, volume, tipo_carga, status } = req.body;
        const sql = "INSERT INTO carga (id_cliente, origem_cidade, origem_estado, destino_cidade, destino_estado, descricao, peso, volume, tipo_carga, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        await db.query(sql, [id_cliente, origem_cidade, origem_estado, destino_cidade, destino_estado, descricao, peso, volume, tipo_carga, status]);
        res.status(201).send('Carga criada com sucesso!');
    } catch (err) {
        console.log("Erro na Cozinha (POST /cargas):", err);
        res.status(500).send('Erro ao criar carga.');
    }
});
// (PUT e DELETE para carga seguem a mesma lógica)

// --- CARDÁPIO DE ROTAS PARA "PROPOSTA" ---
app.get('/propostas', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM proposta");
        res.status(200).json(rows);
    } catch (err) {
        console.log("Erro na Cozinha (GET /propostas):", err);
        res.status(500).send('Erro ao buscar propostas.');
    }
});
app.post('/propostas', async (req, res) => {
    try {
        // Lembretes: id_carga (da tabela 'carga') e id_associado (da tabela 'associado') devem existir
        const { id_carga, id_associado, valor_proposta, prazo_estimado, observacoes, status } = req.body;
        const sql = "INSERT INTO proposta (id_carga, id_associado, valor_proposta, prazo_estimado, observacoes, status) VALUES (?, ?, ?, ?, ?, ?)";
        await db.query(sql, [id_carga, id_associado, valor_proposta, prazo_estimado, observacoes, status]);
        res.status(201).send('Proposta criada com sucesso!');
    } catch (err) {
        console.log("Erro na Cozinha (POST /propostas):", err);
        res.status(500).send('Erro ao criar proposta.');
    }
});
// (PUT e DELETE para proposta seguem a mesma lógica)

// --- CARDÁPIO DE ROTAS PARA "CONTRATO" ---
app.get('/contratos', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM contrato");
        res.status(200).json(rows);
    } catch (err) {
        console.log("Erro na Cozinha (GET /contratos):", err);
        res.status(500).send('Erro ao buscar contratos.');
    }
});
app.post('/contratos', async (req, res) => {
    try {
        // Lembrete: id_proposta deve existir na tabela 'proposta'
        const { id_proposta, status } = req.body;
        const sql = "INSERT INTO contrato (id_proposta, status) VALUES (?, ?)"; // Inserindo apenas os campos essenciais
        await db.query(sql, [id_proposta, status]);
        res.status(201).send('Contrato criado com sucesso!');
    } catch (err) {
        console.log("Erro na Cozinha (POST /contratos):", err);
        res.status(500).send('Erro ao criar contrato.');
    }
});
// (PUT e DELETE para contrato seguem a mesma lógica)

// --- CARDÁPIO DE ROTAS PARA "PAGAMENTO" ---
app.get('/pagamentos', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM pagamento");
        res.status(200).json(rows);
    } catch (err) {
        console.log("Erro na Cozinha (GET /pagamentos):", err);
        res.status(500).send('Erro ao buscar pagamentos.');
    }
});
app.post('/pagamentos', async (req, res) => {
    try {
        // Lembrete: id_contrato deve existir na tabela 'contrato'
        const { id_contrato, valor, status, data_vencimento, metodo } = req.body;
        const sql = "INSERT INTO pagamento (id_contrato, valor, status, data_vencimento, metodo) VALUES (?, ?, ?, ?, ?)";
        await db.query(sql, [id_contrato, valor, status, data_vencimento, metodo]);
        res.status(201).send('Pagamento criado com sucesso!');
    } catch (err) {
        console.log("Erro na Cozinha (POST /pagamentos):", err);
        res.status(500).send('Erro ao criar pagamento.');
    }
});
// (PUT e DELETE para pagamento seguem a mesma lógica)

// --- CARDÁPIO DE ROTAS PARA "AVALIACAO" ---
app.get('/avaliacoes', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM avaliacao");
        res.status(200).json(rows);
    } catch (err) {
        console.log("Erro na Cozinha (GET /avaliacoes):", err);
        res.status(500).send('Erro ao buscar avaliações.');
    }
});
app.post('/avaliacoes', async (req, res) => {
    try {
        // Lembrete: id_avaliador e id_avaliado devem existir na tabela 'usuario'
        const { id_avaliador, id_avaliado, nota, comentario } = req.body;
        const sql = "INSERT INTO avaliacao (id_avaliador, id_avaliado, nota, comentario) VALUES (?, ?, ?, ?)";
        await db.query(sql, [id_avaliador, id_avaliado, nota, comentario]);
        res.status(201).send('Avaliação criada com sucesso!');
    } catch (err) {
        console.log("Erro na Cozinha (POST /avaliacoes):", err);
        res.status(500).send('Erro ao criar avaliação.');
    }
});
// (PUT e DELETE para avaliacao seguem a mesma lógica)


// --- LIGAR O SERVIDOR ---
const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`API (Garçom) está de pé e ouvindo na porta ${PORTA}`);
    console.log(`Acesse http://localhost:${PORTA} no seu navegador.`);
});