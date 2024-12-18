import { Event } from '@triumph/domain/entity/event';
import EventModel from '../../models/event.model';
import EventRepositoryWriter from '@triumph/application/ports/repositories/writer/event-repository-writer';

export default class SequelizeEventRepositoryWriter implements EventRepositoryWriter {
  async add(event: Event): Promise<Event> {
    try {
      const newEvent = await EventModel.create({
        name: event.name,
      });

      return new Event(newEvent.id, newEvent.name);
    } catch (error) {
      console.error("Erreur lors de la création de l'événement :", error);
      throw new Error("Erreur lors de la création de l'événement");
    }
  }

  /* async edit(event: Event): Promise<Event> {
    try {
      const [updatedCount] = await EventModel.update(
        { name: event.name },
        { where: { id: event.id } }
      );

      if (updatedCount === 0) {
        throw new Error(`Événement avec l'ID ${event.id} non trouvé.`);
      }

      return event;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'événement :", error);
      throw new Error("Erreur lors de la mise à jour de l'événement");
    }
  } */
}
