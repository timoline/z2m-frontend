import React, { FunctionComponent, PropsWithChildren } from "react";
import { CompositeFeature, GenericExposedFeature, Endpoint, FeatureAccessMode, DeviceState } from "../../../types";
import Button from "../../button";


export type FetatureWrapperProps = {
    feature: CompositeFeature | GenericExposedFeature;
    deviceState?: DeviceState;
    onRead(endpoint: Endpoint, property: object): void;
};
export const FeatureWrapper: FunctionComponent<PropsWithChildren<FetatureWrapperProps>> = (props) => {
    const { children, feature, onRead } = props;
    const isColor = feature.name?.startsWith("color_"); //hardcode for color
    const isReadable = (feature.access & FeatureAccessMode.ACCESS_READ) || isColor;
    return <div className="row border-bottom pt-1" >
        <div className="col-12 col-md-3">
            <label className="col-form-label w-100">
                <div className="d-flex justify-content-between">
                    <strong title={JSON.stringify(feature)}>{feature.name}</strong>
                    {isReadable ? (
                        <Button<CompositeFeature | GenericExposedFeature> item={feature} onClick={(item) => {
                            onRead(feature.endpoint as Endpoint, { [item.property]: "" })
                        }} className="btn btn-primary btn-sm"><i className="fa fa-sync"></i></Button>
                    ) : null}
                </div>
                {feature.description ? <small className="d-block text-muted">{feature.description}</small> : null}
            </label>
        </div>
        <div className="col-12 col-md-9">
            {children}
        </div>
    </div>
}



