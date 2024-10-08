import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ProdegeService } from './prodege.service';
import { ProdegeController } from './prodege.controller';

describe('Prodege Controller', () => {
  let app: INestApplication;
  let prodegeService: ProdegeService;

  beforeEach(async () => {
    const prodegeServiceMock = {
      saveProdegeReward: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ProdegeController],
      providers: [
        {
          provide: ProdegeService,
          useValue: prodegeServiceMock,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prodegeService = moduleFixture.get<ProdegeService>(ProdegeService);
  });

  it(`/GET prodege/rewards`, async () => {
    process.env.PRODEGE_SECRET_KEY = 'abcdf1234567890';
    await app.listen(9999);
    await request(app.getHttpServer())
      .get('/prodege/reward')
      .query({
        uid: 'P3jTGGuRy8hZkMUWvdykFjl0jfB2',
        tokens: 800,
        usd_value: 0.4,
        tx: '659127487',
        offer_name: '',
        task_name: '',
        survey_category: 'Other',
        hash: '6a4688567b1cea920376be5ed8a85db8eac93c6b',
      })
      .expect(200);

    expect(prodegeService.saveProdegeReward).toHaveBeenCalledWith({
      uid: 'P3jTGGuRy8hZkMUWvdykFjl0jfB2',
      tokens: 800,
      usdValue: 0.4,
      tx: '659127487',
      offerName: '',
      taskName: '',
      surveyCategory: 'Other',
      hash: '6a4688567b1cea920376be5ed8a85db8eac93c6b',
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
