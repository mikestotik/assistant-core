export enum LLMStreamEventType {
  on_chain_start = 'on_chain_start',
  on_chain_stream = 'on_chain_stream',
  on_chain_end = 'on_chain_end',
  on_prompt_start = 'on_prompt_start',
  on_prompt_end = 'on_prompt_end',

  on_llm_start = 'on_llm_start',
  on_llm_stream = 'on_llm_stream',
  on_llm_end = 'on_llm_end',

  on_parser_start = 'on_parser_start',
  on_parser_end = 'on_parser_end'
}