import Task from "../models/Task";
import { getPagination } from '../libs/getPagination';


export const createTask = async (req, res, next) => {

    //valido vengan datos
    if (!req.body.text) {
        return res.status(400).send({
            error_message: 'Text is required',
        });
    }

   
    //guarda actividad
    try {

        const newTask = new Task(
            {
                text: req.body.text,
                completed: req.body.completed,

            }
        )

        newTask
            .save()
            .then((result) => {
                console.log(`Task with id ${result._id} was created.`)
                res.json({ result });
            })
            .catch(err => {
                throw err
            })

    } catch (err) {
        next(err);
    }



}


export const findAllTasks = async (req, res, next) => {
    try {
        const { size, page, text } = req.query;

        const condition = text
            ? {
                text: { $regex: new RegExp(text), $options: 'i' },
            }
            : {};

        const { limit, offset } = getPagination(page, size);

        const data = await Task.paginate(condition, {
            offset,
            limit,
            text,
            
        });

        res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1,
        });
    } catch (err) {
        next(err);
    }
};


export const findOneTask = async (req, res, next) => {
    const { id } = req.params;

    try {
        // const order = await Activity.findById(id).populate('vianda').populate('user');
        const task = await Task
        .findById(id)


        if (!task) {
            return res.status(404).json({
                error_message: `The task with id ${id} does not exists.`,
            });
        }

        res.json(task);
    } catch (err) {
        next(err);
    }
};

export const updateTask = async (req, res, next) => {
    const id = req.params.id;
    if (!req.body.text) {
        return res.status(400).json({
            error_message: `We have no data.`
    })
    }
    try {
        const updateTask = await Task.findByIdAndUpdate(id, req.body);

        if (!updateTask) {
            return res.status(404).json({
                error_message: `The task with id: ${id} does not exists.`,
            });
        }
        res.json({
            message: `Task ${id} updated.`,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    try{
        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask) {
            return res.status(404).json({
                error_message: `Not found activity ${id}.`,
            });
        }
        res.json({
            message: `Task ${id} was deleted.`,
        });
    } catch (err) {
        next(err);
    }
};
