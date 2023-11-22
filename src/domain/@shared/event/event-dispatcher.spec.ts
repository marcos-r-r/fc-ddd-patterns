import { event } from "./../../../../node_modules/eventemitter2/eventemitter2.d";
import EnviaConsoleLogHandler from "../../customer/event/handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "../../customer/event/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/envia-console-log2.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();

    //Product
    const eventHandlerProduct = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandlerProduct);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandlerProduct);

    //Customer
    //Handler Console log 1
    const eventHandlerCustomerLog1 = new EnviaConsoleLog1Handler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerCustomerLog1);

    //Handler Console log 2
    const eventHandlerCustomerLog2 = new EnviaConsoleLog2Handler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandlerCustomerLog2);

    //Handler Console log
    const eventHandlerCustomerLog = new EnviaConsoleLogHandler();
    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      eventHandlerCustomerLog
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(eventHandlerCustomerLog);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();

    //Product
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );

    //Customer
    const eventHandlerCustomerLog1 = new EnviaConsoleLog1Handler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerCustomerLog1);
    eventDispatcher.unregister(
      "CustomerCreatedEvent",
      eventHandlerCustomerLog1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(0);

    const eventHandlerCustomerLog2 = new EnviaConsoleLog2Handler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerCustomerLog2);
    eventDispatcher.unregister(
      "CustomerCreatedEvent",
      eventHandlerCustomerLog2
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(0);

    const eventHandlerCustomerLog = new EnviaConsoleLogHandler();
    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      eventHandlerCustomerLog
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(eventHandlerCustomerLog);
    eventDispatcher.unregister(
      "CustomerAddressChangedEvent",
      eventHandlerCustomerLog
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length
    ).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    //Product
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    //Customer
    const eventHandlerCustomerLog1 = new EnviaConsoleLog1Handler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerCustomerLog1);

    const eventHandlerCustomerLog2 = new EnviaConsoleLog2Handler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerCustomerLog2);

    const eventHandlerCustomerLog = new EnviaConsoleLogHandler();
    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      eventHandlerCustomerLog
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(eventHandlerCustomerLog);

    //Unregister all
    eventDispatcher.unregisterAll();
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    //Product
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();

    //Customer
    const eventHandlerCustomerLog1 = new EnviaConsoleLog1Handler();
    const spyEventHandlerCustomerLog1 = jest.spyOn(
      eventHandlerCustomerLog1,
      "handle"
    );
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerCustomerLog1);

    const eventHandlerCustomerLog2 = new EnviaConsoleLog2Handler();
    const spyEventHandlerCustomerLog2 = jest.spyOn(
      eventHandlerCustomerLog2,
      "handle"
    );
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandlerCustomerLog2);

    const eventHandlerCustomerLog = new EnviaConsoleLogHandler();
    const spyEventHandlerCustomerLog = jest.spyOn(
      eventHandlerCustomerLog,
      "handle"
    );
    eventDispatcher.register(
      "CustomerAddressChangedEvent",
      eventHandlerCustomerLog
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
    ).toMatchObject(eventHandlerCustomerLog);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: 1,
      nome: "Cliente 1",
    });

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: 1,
      nome: "Cliente 1",
      Address: {
        street: "Rua 1",
        number: 1,
        city: "Cidade 1",
        state: "Estado 1",
        country: "Pais 1",
      },      
    });

    eventDispatcher.notify(customerCreatedEvent);
    eventDispatcher.notify(customerAddressChangedEvent);
    expect(spyEventHandlerCustomerLog1).toHaveBeenCalled();
    expect(spyEventHandlerCustomerLog2).toHaveBeenCalled();
    expect(spyEventHandlerCustomerLog).toHaveBeenCalled();
  });
});
