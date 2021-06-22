const express = require('express');
const app = express();
app.use(express.json());

//Permissões
var cors = require('cors');
app.use(cors());

app.listen(process.env.PORT || 3000);

app.get('/', function (req, res) {
    res.send("Hello World!");
}
);

app.get('/', function (req, res) {
    res.send("Hello denovo!");
});

var obras = [
    { titulo: "Amar, verbo intransitivo", autor: "Mário de Andrade" },
    { titulo: "O bem-amado", autor: "Dias Gomes" },
    { titulo: "Instituição da religião Cristã", autor: "João Calvino" },
    { titulo: "Alienista", autor: "Machado de Assis" },

]

app.get('/obras', function (req, res) {
    //res.send(mensagens);
    res.send(obras.filter(Boolean));
}
);
app.get('/obras/:id', function (req, res) {
    const id = req.params.id - 1;
    const obra = obras[id];

    if (!obra) {
        res.send("obra não encontrada!");
    } else {
        res.send(obra);
    }
}
);

app.post('/obras',
    (req, res) => {
        console.log(req.body.obra);
        const obra = req.body;
        obras.push(obra);
        res.send("obra adicionada!")
    }
);

app.put('/obras/:id',
    (req, res) => {
        var id = req.params.id - 1;
        console.log(req.body.obra);
        const obra = req.body;
        obras[id] = obra;
        res.send("obra atualizada!")
    }
);

app.delete('/obras/:id',
    (req, res) => {
        var id = req.params.id - 1;
        delete obras[id];
        res.send("obra removida!");
    }
);

const mongodb = require('mongodb');
const password ="WPntNHPnm2Tx5Sm";
const connectionString = `mongodb+srv://meuusuario:${password}@cluster0.tyg9e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// const password = process.env.PASSWORD || "asdf";


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

(async () => {
    const client = await mongodb.MongoClient.connect(connectionString, options);
    const db = client.db('MyFirstDataBase');
    var livros = db.collection('Livros');


    app.get('/database', async function (req, res) {
        res.send(await livros.find({}).toArray());
    }
    );
    app.get('/database/:id', async function (req, res) {
        const id = req.params.id;
        const livro = await livros.findOne(
            { _id: mongodb.ObjectID(id) }
        );
        console.log(livro);
        if (!livro) {
            res.send("Livro não encontrado");
        } else {
            res.send(livro);
        }
    }
    );

    app.post('/database',
        async function (req, res) {
            const livro = req.body;
            livros.insertOne(livro);
            res.send("Livro inserido com sucesso.");
        }
    );

    app.put('/database/:id',
        async (req, res) => {
            const id = req.params.id;
            const livro = req.body;

            delete livros["_id"];

            const num_livros = await livros.countDocuments({ _id: mongodb.ObjectID(id) });

            if (num_livros !== 1) {
                res.send('Ocorreu um erro por conta do número de livros');
                return;
            }

            await livros.updateOne(
                { _id: mongodb.ObjectID(id) },
                { $set: livro }
            );

            res.send("Livro atualizado com sucesso.")
        }
    )

    app.delete('/database/:id',
        async (req, res) => {
            const id = req.params.id;

            await livros.deleteOne({ _id: mongodb.ObjectID(id) });

            res.send("Livro removido com sucesso.");
        }
    );
})();