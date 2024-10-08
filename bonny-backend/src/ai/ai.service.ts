import { ChatOpenAI } from '@langchain/openai';
import { Injectable } from '@nestjs/common';
import { HumanMessage } from '@langchain/core/messages';
import { QUERY_PROMPT, TEST_PROMPT } from './prompts/prompts';
import { QuerySchema } from './model/QueryResponse';
import { TestResponseSchema } from './model/TestResponse';
import { DataSource } from 'typeorm';

@Injectable()
export class AiService {
  aiModel: ChatOpenAI;

  constructor(private dataSource: DataSource) {
    this.initAiModel();
  }

  initAiModel() {
    this.aiModel = new ChatOpenAI({
      model: process.env.MODEL_NAME,
      temperature: 0.1,
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateSQL(query: string) {
    const message = this.createMessage(query, QUERY_PROMPT);

    const res = await this.aiModel
      .withStructuredOutput(QuerySchema)
      .invoke([message]);

    try {
      const data = QuerySchema.parse(res);
      return data;
    } catch (e) {
      throw new Error("Couldn't parse Test Result");
    }
  }

  async executeSQL(query: string) {
    return await this.dataSource.query(query);
  }

  createMessage(query: string, prompt: string) {
    return new HumanMessage({
      content: [
        {
          type: 'text',
          text: `${prompt}\n${query}`,
        },
      ],
    });
  }

  async isDuplicate(hash: string) {
    const receipt = await this.dataSource.query(
      `SELECT * FROM receipt WHERE hash = $1`,
      [hash],
    );
    return receipt.length > 0;
  }

  async test(imageData: string, imageType: string) {
    const message = this.createHumanMessage(imageData, imageType, TEST_PROMPT);

    const res = await this.aiModel
      .withStructuredOutput(TestResponseSchema)
      .invoke([message]);

    try {
      console.log(res);
      const data = TestResponseSchema.parse(res);
      return data;
    } catch (e) {
      throw new Error("Couldn't parse Test Result");
    }
  }

  createHumanMessage(imageData: string, imageType: string, prompt: string) {
    return new HumanMessage({
      content: [
        {
          type: 'text',
          text: prompt,
        },
        {
          type: 'image_url',
          image_url: {
            url: `data:${imageType};base64,${imageData}`,
          },
        },
      ],
    });
  }
}
