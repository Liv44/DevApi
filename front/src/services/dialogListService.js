import { Dialog, Notify } from 'quasar'
import { useListStore } from 'src/stores/lists-store';
import { createNewList, updateList, deleteList } from './lists';

const listsStore = useListStore();

export const toggleAddList = async (router) => {
    Dialog.create({
        title: 'Créer une nouvelle liste',
        message: 'Titre de la liste',
        prompt: {
            model: '',
            isValid: val => val.length > 2,
            type: 'text'
        },
        cancel: true,
        persistent: false,
        noEscDismiss: false
    }).onOk(async data => {
        try {
            await createNewList({ title: data });
            await listsStore.fillLists();
        } catch (err) {
            Notify.create("Il y a eu une erreur lors de l'ajout de la liste.")
            console.error(err);
        }
    })
}

export const toggleUpdateList = async (router, list) => {
    Dialog.create({
        title: 'Modifier la liste',
        message: 'Titre de la liste',
        prompt: {
            value: list.title,
            model: list.title,
            isValid: val => val.length > 2,
            type: 'text'
        },
    }).onOk(async data => {
        try {
            await updateList({ title: data, id: list._id })
            await listsStore.fillLists();
        } catch (err) {
            Notify.create("Il y a eu une erreur lors de la modification de la liste.")
            console.error(err);
        }
    })
}

export const toggleDeleteList = async (router, list) => {
    Dialog.create({
        title: 'Supprimer la liste',
        message: `Tu es sur le point de supprimer la liste "${list.title}". Es-tu sûr(e) ?`,
        ok: {
            label: 'Supprimer',
            push: true,
            color: 'negative'
        },
        cancel: {
            label: 'Annuler',
            push: true,
            outline: true,
        }
    }).onOk(async data => {
        try {
            await deleteList(list._id);
            await listsStore.fillLists();
            router.push({ name: 'dashboard' })
        } catch (err) {
            Notify.create('Il y a eu une erreur lors de la suppression de la liste.')
            console.error(err)
        }
    })
}