import React from 'react';
import PropTypes from 'prop-types';
import { toUpper } from 'lodash';
import TimeDataField from './time-data-field';
import TextDataField from './text-data-field';
import DateDataField from './date-data-field';
import CheckboxDataField from './checkbox-data-field';
import SelectDataField from './select-data-field';
import FilteredSelectDataField from './filtered-select-data-fields';
import PasswordDataField from './password-data-field';
import FormulaDataField from './formula-data-field';
import NumberDataField from './number-data-field';
import ReadOnlyDataField from './read-only-text-field';
import CodeMirrorDataField from './code-mirror-data-field';

export default class DataField extends React.Component {
  getFieldType() {
    if (this.props.type) {
      return this.props.type;
    } else if (this.props.schema) {
      return this.props.schema.type;
    }
    return 'READ_ONLY';
  }

  createReadOnlyDataField() {
    return <ReadOnlyDataField {...this.props} />;
  }

  createDateComponent() {
    const value = new Date(this.props.value);
    if (this.props.schema) {
      return (
        <DateDataField
          value={value}
          {...this.props.schema}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
      );
    }
    return <DateDataField value={value} {...this.props} />;
  }

  createTextComponent() {
    if (this.props.schema) {
      return (
        <TextDataField
          value={this.props.value}
          {...this.props.schema}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
      );
    }
    return <TextDataField {...this.props} />;
  }

  createNumberDataField() {
    if (this.props.schema) {
      return (
        <NumberDataField
          value={this.props.value}
          {...this.props.schema}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
      );
    }
    return <NumberDataField {...this.props} />;
  }

  createCodeValueComponent() {
    if (this.props.schema) {
      return (
        <CodeValueField
          value={this.props.value}
          {...this.props.schema}
          onChange={this.props.onChange}
        />
      );
    }
    return (<CodeValueField {...this.props} />);
  }

  createTimeComponent() {
    if (this.props.schema) {
      return (
        <TimeDataField
          value={this.props.value}
          {...this.props.schema}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
      );
    }
    return <TimeDataField {...this.props} />;
  }

  createCheckboxComponent() {
    if (this.props.schema) {
      return (
        <CheckboxDataField
          value={this.props.value}
          {...this.props.schema}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
      );
    }
    return (<CheckboxDataField {...this.props} />);
  }

  createSelectComponent() {
    if (this.props.schema) {
      return (
        <SelectDataField
          value={this.props.value}
          {...this.props.schema}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
      );
    }
    return (<SelectDataField {...this.props} />);
  }

  createFilterSelectComponent() {
    if (this.props.schema) {
      return (
        <FilteredSelectDataField
          value={this.props.value}
          {...this.props.schema}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
      );
    }
    return (<FilteredSelectDataField {...this.props} />);
  }

  createPasswordComponent() {
    if (this.props.schema) {
      return (
        <PasswordDataField
          value={this.props.value}
          {...this.props.schema}
          onChange={this.props.onChange}
          disabled={this.props.disabled}
        />
      );
    }
    return (<PasswordDataField {...this.props} />);
  }

  createFormulaComponent() {
    if (this.props.schema) {
      return (
        <FormulaDataField
          {...this.props.schema}
          disabled
        />
      );
    }
    return <FormulaDataField {...this.props} />;
  }

  createField() {
    const fieldType = this.getFieldType();
    switch (toUpper(fieldType)) {
      case 'DATE':
        return this.createDateComponent();
      case 'TIME':
        return this.createTimeComponent();
      case 'BOOL':
        return this.createCheckboxComponent();
      case 'SELECT':
        return this.createSelectComponent();
      case 'FILTER_SELECT':
        return this.createFilterSelectComponent();
      case 'PASSWORD':
        return this.createPasswordComponent();
      case 'FORMULA':
        return this.createFormulaComponent();
      case 'NUMBER' :
        return this.createNumberDataField();
      case 'TEXT':
        return this.createTextComponent();
      case 'CODE':
        return this.createCodeMirrorComponent();
      default:
        return this.createReadOnlyDataField();
    }
  }

  render() {
    return (
      <div>
        {this.createField()}
      </div>
    );
  }
}

DataField.propTypes = {
  value: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ],
  ),
  docField: PropTypes.string,
  displayName: PropTypes.string,
  onChange: PropTypes.func,
  menuItems: PropTypes.array,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  schema: PropTypes.object,
};
