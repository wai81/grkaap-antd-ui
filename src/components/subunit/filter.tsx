
import { Button, Card, Col, Form, FormProps, Icons, Input, Row, Select, useSelect } from "@pankod/refine-antd";
import {
  CrudFilters,
  getDefaultFilter,
  useTranslate,
} from "@pankod/refine-core";
import { IOrganization } from "interfaces/IOrganization";


const FilterSubunit: React.FC<{ formProps: FormProps; filters: CrudFilters }> = (
  props,
) => {
  const t = useTranslate();

  const { formProps, filters } = props;
  const { selectProps: organizatonSelectProps } = useSelect<IOrganization>({
      resource: "organizations",
      defaultValue: getDefaultFilter("organization__id__in", filters),
  });

  return (
    <Card title={t("subunits.filter.search.label")}>
      <Form
          layout="vertical"
          {...formProps}
          initialValues={{
              q: getDefaultFilter("q", filters),
              organizaton: getDefaultFilter("organization__id__in", filters),
              is_active: getDefaultFilter("is_active", filters ),
          }}
      >
          <Row gutter={[10, 0]} align="bottom">
              <Col xl={24} md={8} sm={12} xs={24}>
                  <Form.Item label={t("subunits.filter.search.label")} name="q">
                      <Input
                          placeholder={t("subunits.filter.search.placeholder")}
                          prefix={<Icons.SearchOutlined />}
                      />
                  </Form.Item>
              </Col>
              
              <Col xl={24} md={8} sm={12} xs={24}>
                  <Form.Item
                      label={t("subunits.filter.organization.label")}
                      name="organization"
                  >
                      <Select
                          {...organizatonSelectProps}
                          allowClear
                          placeholder={t("subunits.filter.organization.placeholder")}
                      />
                  </Form.Item>
              </Col>
              <Col xl={24} md={8} sm={12} xs={24}>
                  <Form.Item
                      label={t("subunits.filter.is_active.label")}
                      name="is_active"
                  >
                      <Select
                          allowClear
                          placeholder={t("subunits.filter.is_active.placeholder")}
                          options={[
                            {
                                label: t("subunits.filter.is_active.none"),
                                value: ""
                            },
                            {
                              label: t("subunits.filter.is_active.true"),
                              value: "true"
                            },
                            {
                              label: t("subunits.filter.is_active.false"),
                              value: "false"
                            },
                          ]}
                      />
                  </Form.Item>
              </Col>
              <Col xl={24} md={8} sm={12} xs={24}>
                  <Form.Item>
                      <Button
                          htmlType="submit"
                          type="primary"
                          size="large"
                          block
                      >
                          {t("subunits.filter.submit")}
                      </Button>
                  </Form.Item>
              </Col>
          </Row>
      </Form>
    </Card>
  );
};

export default FilterSubunit;