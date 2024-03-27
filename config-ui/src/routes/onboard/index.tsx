/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { useState, useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { theme, Layout } from 'antd';

import API from '@/api';
import { PageLoading } from '@/components';
import { useRefreshData } from '@/hooks';

import type { Record } from './context';
import { Context } from './context';
import { Step0 } from './step-0';
import { Step1 } from './step-1';
import { Step2 } from './step-2';
import { Step3 } from './step-3';
import { Step4 } from './step-4';
import * as S from './styled';

const steps = [
  {
    step: 1,
    title: 'Create Project',
  },
  {
    step: 2,
    title: 'Configure Connection',
  },
  {
    step: 3,
    title: 'Add data scope',
  },
];

export const Onboard = () => {
  const [step, setStep] = useState(0);
  const [records, setRecords] = useState<Record[]>([]);
  const [projectName, setProjectName] = useState<string>();
  const [plugin, setPlugin] = useState<string>();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  const { ready, data } = useRefreshData(() => API.store.get('onboard'));

  useEffect(() => {
    if (ready && data) {
      setStep(data.step);
      setRecords(data.records);
      setProjectName(data.projectName);
      setPlugin(data.plugin);
    }
  }, [ready, data]);

  if (!ready) {
    return <PageLoading />;
  }

  return (
    <Context.Provider
      value={{
        step,
        records,
        done: false,
        projectName,
        plugin,
        setStep,
        setRecords,
        setProjectName: setProjectName,
        setPlugin: setPlugin,
      }}
    >
      <Layout style={{ height: '100vh' }}>
        <S.Inner>
          {step === 0 ? (
            <Step0 />
          ) : (
            <>
              <S.Header>
                <h1>Connect to your first repository</h1>
                <CloseOutlined style={{ fontSize: 18, color: '#70727F', cursor: 'pointer' }} />
              </S.Header>
              <S.Content>
                {[1, 2, 3].includes(step) && (
                  <S.Step>
                    {steps.map((it) => (
                      <S.StepItem key={it.step} $actived={it.step === step} $activedColor={colorPrimary}>
                        <span>{it.step}</span>
                        <span>{it.title}</span>
                      </S.StepItem>
                    ))}
                  </S.Step>
                )}
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                {step === 4 && <Step4 />}
              </S.Content>
            </>
          )}
        </S.Inner>
      </Layout>
    </Context.Provider>
  );
};