const { request } = require('express');
const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

// Obtiene los estudiantes desde la base de datos y los devuelve en un excel
const getestudiante = async (req, res) => {
    try {
        let sql = 'select * from estudiantes';
        let result = await _pg.executeSql(sql);
        let rows = result.rows;

        const _excel = new ExcelService();

        await _excel.createWorkSheet(rows);

        return res.send({
            url: 'http://localhost:3001/estudiantes.xlsx',
            ok: true,
            message: "estudiantes consultados",
            content: rows,
        })

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error consultando al estudiante",
            content: error,
        })
    }

}

// Crea un nuevo estudiantes teniendo como parámetros el nombre y el email recibidos en un json
const createestudiante = async (req, res) => {
    try {
        let estudiante = req.body;
        let sql = `INSERT INTO public.estudiantes (name, email) VALUES ('${estudiante.name}','${estudiante.email}');`;
        let result = await _pg.executeSql(sql);
        if (result.rowCount==1) {
            _email.sendEmail(estudiante.email);
        }
        return res.send({
            ok: true,
            message: result.rowCount == 1 ? "estudiante creado" : "El estudiante no fue creado",
            content: estudiante,
        })
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando el estudiante",
            content: error,
            xd: req.body,
        })
    }
}

// Actualiza el estudiante, la url debe contener /:id
const updateestudiante = async (req, res) => {
    try {
        let id = req.params.id;
        let estudiante = req.body;

        let sql = `UPDATE public.estudiantes 
        SET name='${estudiante.name}', email='${estudiante.email}' 
        WHERE id='${id}';`;
        let result = await _pg.executeSql(sql);

        return res.send({
            ok: true,
            message: result.rowCount == 1 ? "Datos actualizados" : "El super no fue actualizado",
            content: estudiante,
        })
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error modificando al super",
            content: error,
        })
    }
}

// Elimina un estudiante, la url debe contener /:id
const deleteestudiante = async (req, res) => {
    try {
        let id =req.params.id;
        let sql = `DELETE FROM public.estudiantes WHERE id='${id}';`;
        let result = await _pg.executeSql(sql);

        return res.send({
            ok: true,
            message: result.rowCount == 1 ? "Super eliminado" : "El estudiante no fue eiminado",
            content: id,
        })
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error eliminando el estudiante",
            content: error,
        })
    }
}

module.exports = { getestudiante, createestudiante, updateestudiante, deleteestudiante }