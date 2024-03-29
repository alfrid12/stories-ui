import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import '../css/Dropdown.css';

const DropdownMenu = props => {

    // This function is called whenever a user clicks on a dropdown option inside of the dropdown menu
    const selectDropdownOption = entityId => {

        /** entityId comes back as a string from the HTML
         * However, some entities have IDs that should be integers, and others (like stories), have string IDs
         * Therefore, we need to check if an ID can be parsed into an integer, and if so, parse it */
        entityId = parseInt(entityId) ? parseInt(entityId) : entityId

        // Call onChange event handler (passed in from parent)
        props.onChange(entityId);
    }

    /** This function takes an array of entities, and converts each entity to a dropdown option
     * @param {*} entities an array of JS objects, each with an id attribute and a displayAttribute attribute (name, value, etc.)
     * 
     * Example: entities = [{id: 1, name: 'Team One!'}, {id: 1, name: 'Team Two!'}]   //displayAttribute would be 'name'
     */
    const createDropdownOptions = entities => {
        return entities.map(entity => {
            return <Dropdown.Item
                key={entity.id}
                eventKey={entity.id}
                onSelect={selectDropdownOption}>
                {entity[props.displayAttribute]}
            </Dropdown.Item>;
        });
    }

    const getEntityById = entityId => {
        return props.entities.filter(entity => entity.id === entityId)[0];
    }

    // Default dropdown title to placeholder prop (Ex.- 'Please select an option')
    let dropdownTitle = props.placeholder;

    // If an entity is currently selected, display that entity in the dropdown menu as the currently selected option
    if (props.selectedEntityId) {
        const selectedEntity = getEntityById(props.selectedEntityId);

        if (selectedEntity && selectedEntity[props.displayAttribute]) {
            dropdownTitle = selectedEntity[props.displayAttribute];
        }
    }

    return (
        <Dropdown>
            <Form.Label>{props.label}</Form.Label><br/>
            <Dropdown.Toggle style={{ minWidth: '80%' }} variant="secondary">{dropdownTitle}</Dropdown.Toggle>
            <Dropdown.Menu variant="secondary" disabled={props.disabled}>
                {createDropdownOptions(props.entities)}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownMenu;