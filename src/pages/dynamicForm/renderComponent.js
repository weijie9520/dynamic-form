import {
    IS_FORM_COMPONENT,
    IS_CONTAINER_COMPONENT,
    IS_LAYOUT_COMPONENT,
} from './constant/index';
import Emittery from 'emittery';
import GlobalContext from './context/GlobalContext';
import Input from './components/Input/index';
import Select from './components/Select/index';
import DatePicker from './components/DatePicker/index';
import Form from './components/Form/index';
import FormItem from './components/FormItem/index';
import EmptyComponent from './components/EmptyComponent';
import { forEach, isEmpty, every, map } from 'lodash';
import { useContext, useEffect, useMemo } from 'react';
import * as actions from './constant/linkageActions';
import { usePersistFn, useSetState } from 'ahooks';

const ComMap = {
    Form,
    Select,
    Input,
    DatePicker,
};

const RenderComponent = params => {
    const {
        type: componentName,
        uuid,
        subCollection,

        ...other
        // styles,
        // config,
        // props,
        // linkages,
    } = params;

    const UUIDSTRING = uuid.toString();

    const { config, linkages } = other;
    const { emitter } = useContext(GlobalContext);

    // 状态管理
    const [state, setState] = useSetState({
        visible: config.visible || true,
    });

    const handleChangeStatus = usePersistFn(status => {
        status = !!status;
        if (state.visible === status) return;
        setState({ visible: status });
    });

    useEffect(() => {
        console.log('11111');
        emitter.on(UUIDSTRING, handleChangeStatus);

        return () => {
            emitter.off(UUIDSTRING, handleChangeStatus);
        };
    }, [handleChangeStatus, emitter]);

    const { visible } = state;

    if (!ComMap[componentName] || !visible) return <EmptyComponent />;
    const { type, component: Component } = ComMap[componentName];

    if (type === IS_FORM_COMPONENT) {
        return (
            <FormItem key={uuid} {...other}>
                <Component />
            </FormItem>
        );
    }

    if (isEmpty(subCollection)) {
        if (type === IS_CONTAINER_COMPONENT || type === IS_LAYOUT_COMPONENT) {
            return <Component key={uuid} {...other} />;
        } else {
            throw new Error('类型错误');
        }
    }

    if (type === IS_CONTAINER_COMPONENT || type === IS_LAYOUT_COMPONENT) {
        return (
            <Component key={uuid} {...other}>
                {map(subCollection, sub => (
                    <RenderComponent key={sub.uuid} {...sub} />
                ))}
            </Component>
        );
    }

    throw new Error('类型错误');
};

const DynamicForm = props => {
    const { json } = props;

    const globalState = useMemo(() => {
        const emitter = new Emittery();
        return { emitter };
    }, []);

    return (
        <GlobalContext.Provider value={globalState}>
            <RenderComponent {...json} />
        </GlobalContext.Provider>
    );
};

export default DynamicForm;