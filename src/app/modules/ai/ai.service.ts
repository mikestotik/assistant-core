import { ChatOllama } from '@langchain/community/chat_models/ollama';
import type { ChatPromptTemplate } from '@langchain/core/prompts';
import type { StructuredToolInterface } from '@langchain/core/tools';
import { Injectable } from '@nestjs/common';
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';
import { pull } from 'langchain/hub';
import { ChatMessageHistory } from 'langchain/memory';
import { RunnableWithMessageHistory } from '@langchain/core/runnables';
import { ChainValues } from '@langchain/core/utils/types';


@Injectable()
export class AiService {

  private agentExecutors = new Map<string, RunnableWithMessageHistory<Record<string, any>, ChainValues>>();


  constructor() {}


  public getExecutor(assistantId: string) {
    return this.agentExecutors.get(assistantId);
  }


  public async initAgentForAssistant(assistantId: string) {
    if (!this.agentExecutors.has(assistantId)) {
      const executor = await this.createAgentExecutor();
      this.agentExecutors.set(assistantId, executor);
    }
  }


  private async createAgentExecutor() {
    const messageHistory = new ChatMessageHistory();
    const llm = new ChatOllama({
      baseUrl: 'http://localhost:11434',
      model: 'qwen2:1.5b',
      temperature: 0
    });
    const tools: StructuredToolInterface[] = [];
    const prompt = await pull<ChatPromptTemplate>(
      'hwchase17/openai-functions-agent'
    );
    const agent = await createOpenAIFunctionsAgent({
      llm,
      tools,
      prompt
    });
    const agentExecutor = new AgentExecutor({
      agent,
      tools
    });
    return new RunnableWithMessageHistory({
      runnable: agentExecutor,
      getMessageHistory: (_sessionId) => messageHistory,
      inputMessagesKey: 'input',
      historyMessagesKey: 'chat_history'
    });
  }

}
