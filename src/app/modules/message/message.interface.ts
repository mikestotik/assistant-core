const on_llm_start = {
  event: 'on_llm_start',
  name: 'ChatOllama',
  run_id: 'b63a901e-2324-492d-92a1-c6f335741c8a',
  tags: [ 'seq:step:3' ],
  metadata: {
    ls_provider: 'ollama',
    ls_model_name: 'qwen2:1.5b',
    ls_model_type: 'chat',
    ls_temperature: undefined,
    ls_stop: undefined,
    ls_max_tokens: undefined
  },
  data: {
    input: {
      messages: [
        [
          { // SystemMessage
            lc_serializable: true,
            lc_kwargs: {
              content: 'You are a helpful assistant',
              additional_kwargs: {},
              response_metadata: {}
            },
            lc_namespace: [ 'langchain_core', 'messages' ],
            content: 'You are a helpful assistant',
            name: undefined,
            additional_kwargs: {},
            response_metadata: {},
            id: undefined
          },
          { // HumanMessage
            lc_serializable: true,
            lc_kwargs: {
              content: 'Напиши простой пример кода на Rust',
              additional_kwargs: {},
              response_metadata: {}
            },
            lc_namespace: [ 'langchain_core', 'messages' ],
            content: 'Напиши простой пример кода на Rust',
            name: undefined,
            additional_kwargs: {},
            response_metadata: {},
            id: undefined
          }
        ]
      ]
    }
  }
};

const on_llm_stream = {
  event: 'on_llm_stream', // !!!!!!!!!!!!!!!!
  name: 'ChatOllama',
  run_id: 'b63a901e-2324-492d-92a1-c6f335741c8a', // !!!!!!!!!!!!!!!!
  tags: [ 'seq:step:3' ], // !!!!!!!!!!!!!!!!?????
  metadata: {
    ls_provider: 'ollama',
    ls_model_name: 'qwen2:1.5b',
    ls_model_type: 'chat',
    ls_temperature: undefined,
    ls_stop: undefined,
    ls_max_tokens: undefined
  },
  data: {
    chunk: { // AIMessageChunk  // !!!!!!!!!!!!!!!!
      lc_serializable: true,
      lc_kwargs: {
        content: 'К',
        tool_calls: [],
        invalid_tool_calls: [],
        tool_call_chunks: [],
        additional_kwargs: {},
        response_metadata: {}
      },
      lc_namespace: [ 'langchain_core', 'messages' ], // !!!!!!!!!!!!!!!!
      content: 'К', // !!!!!!!!!!!!!!!!
      name: undefined,
      additional_kwargs: {},
      response_metadata: {},
      id: undefined,
      tool_calls: [],
      invalid_tool_calls: [],
      tool_call_chunks: [],
      usage_metadata: undefined
    }
  }
};

const on_llm_end = {
  event: 'on_llm_end',
  run_id: 'b63a901e-2324-492d-92a1-c6f335741c8a',
  tags: [ 'seq:step:3' ],
  data: {
    input: {
      messages: [
        [
          { // SystemMessage
            lc_serializable: true,
            lc_kwargs: {
              content: 'You are a helpful assistant',
              additional_kwargs: {},
              response_metadata: {}
            },
            lc_namespace: [ 'langchain_core', 'messages' ],
            content: 'You are a helpful assistant',
            name: undefined,
            additional_kwargs: {},
            response_metadata: {},
            id: undefined
          },
          { // HumanMessage
            lc_serializable: true,
            lc_kwargs: {
              content: 'Напиши простой пример кода на Rust',
              additional_kwargs: {},
              response_metadata: {}
            },
            lc_namespace: [ 'langchain_core', 'messages' ],
            content: 'Напиши простой пример кода на Rust',
            name: undefined,
            additional_kwargs: {},
            response_metadata: {},
            id: undefined
          }
        ]
      ]
    },
    output: {
      generations: [
        [
          { // ChatGenerationChunk
            text: 'Код на Rust может быть простым и мощным, а вот простой пример может выглядеть так:\n' +
              '\n' +
              '```rust\n' +
              'fn main() {\n' +
              '    let number = 42;\n' +
              '    println!("The value of the variable `number` is: {}", number);\n' +
              '}\n' +
              '```\n' +
              'Этот код определяет переменную number, устанавливает ее значение на 42 и выводит эту величину в консоль.',
            generationInfo: {
              model: 'qwen2:1.5b',
              total_duration: 10963744861,
              load_duration: 1032884994,
              prompt_eval_count: 30,
              prompt_eval_duration: 760517000,
              eval_count: 92,
              eval_duration: 9166325000
            },
            message: { // AIMessageChunk
              lc_serializable: true,
              lc_kwargs: {
                content: 'Код на Rust может быть простым и мощным, а вот простой пример может выглядеть так:\n' +
                  '\n' +
                  '```rust\n' +
                  'fn main() {\n' +
                  '    let number = 42;\n' +
                  '    println!("The value of the variable `number` is: {}", number);\n' +
                  '}\n' +
                  '```\n' +
                  'Этот код определяет переменную number, устанавливает ее значение на 42 и выводит эту величину в консоль.',
                additional_kwargs: {},
                response_metadata: {
                  model: 'qwen2:1.5b',
                  total_duration: 10963744861,
                  load_duration: 1032884994,
                  prompt_eval_count: 30,
                  prompt_eval_duration: 760517000,
                  eval_count: 92,
                  eval_duration: 9166325000
                },
                tool_call_chunks: [],
                id: undefined,
                tool_calls: [],
                invalid_tool_calls: []
              },
              lc_namespace: [ 'langchain_core', 'messages' ],
              content: 'Код на Rust может быть простым и мощным, а вот простой пример может выглядеть так:\n' +
                '\n' +
                '```rust\n' +
                'fn main() {\n' +
                '    let number = 42;\n' +
                '    println!("The value of the variable `number` is: {}", number);\n' +
                '}\n' +
                '```\n' +
                'Этот код определяет переменную number, устанавливает ее значение на 42 и выводит эту величину в консоль.',
              name: undefined,
              additional_kwargs: {},
              response_metadata: {
                model: 'qwen2:1.5b',
                total_duration: 10963744861,
                load_duration: 1032884994,
                prompt_eval_count: 30,
                prompt_eval_duration: 760517000,
                eval_count: 92,
                eval_duration: 9166325000
              },
              id: undefined,
              tool_calls: [],
              invalid_tool_calls: [],
              tool_call_chunks: [],
              usage_metadata: undefined
            }
          }
        ]
      ]
    }
  }
};

export interface MessageMeta {
  runId?: string;
}