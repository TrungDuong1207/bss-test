import {
  Button,
  Form,
  Frame,
  Grid,
  Heading,
  Layout,
  Page,
  Select,
  Toast
} from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from 'react';
import ApplyProduct from '../components/applyProducts/ApplyProduct';
import GeneralInformation from '../components/information/GeneralInformation';
import ProductShow from '../components/productShow/ProductShow';

export default function HomePage() {
  const [selected, setSelected] = useState('');
  const [active, setActive] = useState(false);
  const [generalInfo, setGeneralInfo] = useState({ name: "", priority: "", status: "enable" });
  const [rule, setRule] = useState({
    name: "",
    priority: "",
    status: "enable",
    productFinal: []
  });
  const [savedRules, setSavedRules] = useState([]);
  const [curentRule, setCurentRule] = useState({});

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Save Rule Success" onDismiss={toggleActive} />
  ) : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rule.name.trim() !== "" || rule.priority.trim() !== "") {
      const existingRules = JSON.parse(localStorage.getItem('pricingRules')) || [];
      const updatedRules = [...existingRules, rule];
      localStorage.setItem('pricingRules', JSON.stringify(updatedRules));
      setSavedRules(updatedRules);
      setGeneralInfo({
        ...generalInfo, name: "", priority: ""
      });
      setRule({
        name: "",
        priority: "",
        status: "enable",
        productFinal: []
      })
      setActive((active) => !active);
    }
  };


  const handleSelectChange = (value) => {
    setSelected(value);
    savedRules.forEach((rule) => {
      if (rule.name === value) {
        return setCurentRule(rule)
      }
    })

  }

  useEffect(() => {
    const pricingRules = JSON.parse(localStorage.getItem('pricingRules')) || [];
    setSavedRules(pricingRules);
    setCurentRule(pricingRules[0])
  }, []);


  return (
    <Frame>
      <Page fullWidth>
        {toastMarkup}
        <Grid>
          <Grid.Cell columnSpan={{ xs: 9, sm: 9, md: 9, lg: 9, xl: 9 }}>
            <Form onSubmit={handleSubmit}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Heading>
                    New Pricing Rule
                  </Heading>
                  <Button primary submit>Save Rule</Button>
                </div>
                <br />
                <Layout>
                  <Layout.Section>
                    <GeneralInformation setRule={setRule} rule={rule} generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} />
                  </Layout.Section>

                  <Layout.Section>
                    <ApplyProduct setRule={setRule} rule={rule} />
                  </Layout.Section>
                </Layout>
              </div>
            </Form>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }} >
            <Layout >
              <Layout.Section >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button primary >Show product pricing details</Button>
                  <Select
                    options={[
                      { label: "Choose Option", value: "" },
                      ...savedRules.map((rule) => ({
                        label: rule.name,
                        value: rule.name,
                      }))
                    ]}
                    onChange={handleSelectChange}
                    value={selected}
                  />
                </div>
              </Layout.Section>

              <Layout.Section>
                <ProductShow curentRule={curentRule} />
              </Layout.Section>
            </Layout>
          </Grid.Cell>
        </Grid>


      </Page>
    </Frame>

  );
}

