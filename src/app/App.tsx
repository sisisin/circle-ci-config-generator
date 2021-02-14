import React from 'react';
import { ConfigViewer } from './ConfigViewer';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useCopyToClipboard } from 'react-use';
import YAML from 'yaml';

export const App: React.FC = () => {
  const methods = useForm();
  const { register, handleSubmit, control } = methods;
  const { fields, append } = useFieldArray({
    control,
    name: 'jobs',
  });

  const [state, copyToClipboard] = useCopyToClipboard();

  const onSubmit = handleSubmit((data) => {
    console.log(YAML.stringify(data));

    copyToClipboard(YAML.stringify(data));
  });

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <div>
            <label>version:</label>
            <select name="version" ref={register} placeholder="version">
              <option value="2.0">2.0</option>
              <option value="2.1">2.1</option>
            </select>
          </div>
          <div>
            <label>jobs:</label>
            {fields.map((field, i) => {
              return (
                <div key={field.id}>
                  <input
                    name={`jobs[${i}].value`}
                    ref={register()}
                    defaultValue={field.value}
                  ></input>
                </div>
              );
            })}
            <input type="button" value="add" onClick={() => append({ value: '' })}></input>
          </div>
          <div>
            {state.error ? (
              <p>Unable to copy value: {state.error.message}</p>
            ) : (
              state.value && (
                <div>
                  Copied.<pre>{state.value}</pre>
                </div>
              )
            )}
            <input type="submit" />
          </div>
        </form>
      </FormProvider>
      <hr></hr>
      <ConfigViewer></ConfigViewer>
    </div>
  );
};
